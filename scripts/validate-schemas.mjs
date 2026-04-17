#!/usr/bin/env node
/**
 * Validates all JSON data files against their JSON schemas
 * Used as a quality gate for local and CI/CD validation
 */

import Ajv from 'ajv';
import addFormats from 'ajv-formats';
import fs from 'fs';
import path from 'path';
import url from 'url';

const __dirname = path.dirname(url.fileURLToPath(import.meta.url));
const projectRoot = path.join(__dirname, '..');
const itemDataDir = path.join(projectRoot, 'data/items');

const args = new Set(process.argv.slice(2));
const cycleCheckEnabled = args.has('--check-cycles');

const ajv = new Ajv({ allErrors: true });
addFormats(ajv);

const validationMap = [
	{ schemaFile: 'data/schemas/layer.schema.json', dataDir: 'data/layers', name: 'Layer' },
	{ schemaFile: 'data/schemas/item.schema.json', dataDir: 'data/items', name: 'Item' },
	{ schemaFile: 'data/schemas/stack.schema.json', dataDir: 'data/stacks', name: 'Stack' },
];

const stats = {
	totalFiles: 0,
	validFiles: 0,
	errors: 0,
	warnings: 0,
};

console.log('🔍 JSON Schema Validation - Starting...\n');

for (const { schemaFile, dataDir, name } of validationMap) {
	validateSchemaCategory(schemaFile, dataDir, name, stats);
}

const itemContext = loadItemRecords();
runDependencySemanticChecks(itemContext, stats);

if (cycleCheckEnabled) {
	runCycleChecks(itemContext, stats);
}

console.log('\n📊 Summary');
console.log('─'.repeat(40));
console.log(`Total files:  ${stats.totalFiles}`);
console.log(`Valid:        ${stats.validFiles}`);
console.log(`Warnings:     ${stats.warnings}`);
console.log(`Errors:       ${stats.errors}`);

if (stats.errors === 0) {
	console.log('\n✅ All validations passed!');
	process.exit(0);
}

console.log(`\n❌ Validation failed with ${stats.errors} error(s)`);
process.exit(1);

function validateSchemaCategory(schemaFile, dataDir, name, statsRef) {
	const schemaPath = path.join(projectRoot, schemaFile);
	const dataDirPath = path.join(projectRoot, dataDir);

	if (!fs.existsSync(schemaPath)) {
		console.error(`❌ Schema not found: ${schemaFile}`);
		statsRef.errors++;
		return;
	}

	let schema;
	try {
		schema = JSON.parse(fs.readFileSync(schemaPath, 'utf8'));
	} catch (error) {
		console.error(`❌ Invalid schema JSON: ${schemaFile}`);
		console.error(`   ${error.message}`);
		statsRef.errors++;
		return;
	}

	const validate = ajv.compile(schema);

	if (!fs.existsSync(dataDirPath)) {
		console.warn(`⚠️  Data directory not found: ${dataDir}`);
		statsRef.warnings++;
		return;
	}

	const files = fs
		.readdirSync(dataDirPath)
		.filter((file) => file.endsWith('.json') && file !== '.gitkeep.json')
		.sort();

	if (files.length === 0) {
		console.warn(`⚠️  No JSON files in: ${dataDir}`);
		statsRef.warnings++;
		return;
	}

	console.log(`📋 Validating ${name}s (${files.length} files):`);

	let categoryValid = 0;
	let categoryErrors = 0;

	for (const file of files) {
		statsRef.totalFiles++;
		const filePath = path.join(dataDirPath, file);

		try {
			const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
			const valid = validate(data);

			if (valid) {
				statsRef.validFiles++;
				categoryValid++;
				process.stdout.write('.');
				continue;
			}

			categoryErrors++;
			statsRef.errors++;
			process.stdout.write('✗');
			console.log();
			console.log(`   ❌ ${file}`);
			for (const error of validate.errors) {
				console.log(`      - ${error.instancePath || '/'} ${error.schemaPath}: ${error.message}`);
			}
		} catch (error) {
			categoryErrors++;
			statsRef.errors++;
			process.stdout.write('✗');
			console.log();
			console.log(`   ❌ ${file}: ${error.message}`);
		}
	}

	console.log(`\n   ✓ ${categoryValid}/${files.length} valid`);
	if (categoryErrors > 0) {
		console.log(`   ✗ ${categoryErrors}/${files.length} invalid`);
	}
	console.log('');
}

function loadItemRecords() {
	if (!fs.existsSync(itemDataDir)) {
		return {
			itemRecords: [],
			parseErrors: ['Items directory not found: data/items'],
		};
	}

	const parseErrors = [];
	const itemRecords = fs
		.readdirSync(itemDataDir)
		.filter((file) => file.endsWith('.json') && file !== '.gitkeep.json')
		.sort()
		.map((file) => {
			const filePath = path.join(itemDataDir, file);
			try {
				return { file, data: JSON.parse(fs.readFileSync(filePath, 'utf8')) };
			} catch (error) {
				parseErrors.push(`${file}: invalid JSON (${error.message})`);
				return null;
			}
		})
		.filter(Boolean);

	return { itemRecords, parseErrors };
}

function runDependencySemanticChecks({ itemRecords, parseErrors }, statsRef) {
	console.log('🔗 Dependency semantic checks:');

	if (parseErrors.length > 0) {
		for (const message of parseErrors) {
			statsRef.errors++;
			console.error(`   ❌ ${message}`);
		}
	}

	if (itemRecords.length === 0) {
		statsRef.warnings++;
		console.warn('   ⚠️  No item data available for dependency checks');
		console.log('');
		return;
	}

	const semanticErrors = [];
	const itemIdSet = new Set(itemRecords.map(({ data }) => data.id).filter(Boolean));

	for (const { file, data: item } of itemRecords) {
		const sourceId = item.id;
		const dependencies = Array.isArray(item.dependencies) ? item.dependencies : [];
		const seenEdges = new Set();

		if (!sourceId) {
			semanticErrors.push(`${file}: missing item.id for dependency validation`);
			continue;
		}

		for (const dependency of dependencies) {
			const targetItemId = dependency?.targetItemId;
			const type = dependency?.type;

			if (!targetItemId || !type) {
				semanticErrors.push(`${file}: dependency entry is missing targetItemId or type`);
				continue;
			}

			const scope = dependency?.scope ?? 'required';
			const edgeKey = `${targetItemId}::${type}::${scope}`;

			if (!itemIdSet.has(targetItemId)) {
				semanticErrors.push(`${file}: dependency target '${targetItemId}' does not exist in data/items`);
			}

			if (sourceId === targetItemId) {
				semanticErrors.push(`${file}: self-dependency is not allowed (${sourceId} -> ${targetItemId})`);
			}

			if (seenEdges.has(edgeKey)) {
				semanticErrors.push(`${file}: duplicate dependency edge detected (${sourceId} -> ${targetItemId}, type=${type}, scope=${scope})`);
			} else {
				seenEdges.add(edgeKey);
			}
		}
	}

	for (const message of semanticErrors) {
		statsRef.errors++;
		console.error(`   ❌ ${message}`);
	}

	if (semanticErrors.length === 0 && parseErrors.length === 0) {
		console.log('   ✅ Dependency semantics passed');
	}

	console.log('');
}

function runCycleChecks({ itemRecords }, statsRef) {
	console.log('🧭 Dependency cycle checks:');

	if (itemRecords.length === 0) {
		statsRef.warnings++;
		console.warn('   ⚠️  No item data available for cycle checks');
		console.log('');
		return;
	}

	const graph = new Map();
	for (const { data: item } of itemRecords) {
		if (!item?.id) continue;
		const edges = (item.dependencies ?? [])
			.filter((dependency) => typeof dependency?.targetItemId === 'string')
			.map((dependency) => ({
				to: dependency.targetItemId,
				type: dependency.type,
				scope: dependency.scope ?? 'required',
			}));
		graph.set(item.id, edges);
	}

	const detectedCycles = findCycles(graph);
	if (detectedCycles.length === 0) {
		console.log('   ✅ No cycles detected');
		console.log('');
		return;
	}

	for (const cycle of detectedCycles) {
		const path = cycle.path.join(' -> ');
		const severity = getCycleSeverity(cycle.edges);
		if (severity === 'error') {
			statsRef.errors++;
			console.error(`   ❌ [ERROR] Cycle detected: ${path}`);
		} else {
			statsRef.warnings++;
			console.warn(`   ⚠️  [WARN] Cycle detected: ${path}`);
		}
	}

	console.log('');
}

function findCycles(graph) {
	const states = new Map();
	const stack = [];
	const stackIndexByNode = new Map();
	const seenCycleKeys = new Set();
	const cycles = [];

	for (const node of graph.keys()) {
		if (states.get(node) === 2) continue;
		dfs(node);
	}

	return cycles;

	function dfs(node) {
		states.set(node, 1);
		stackIndexByNode.set(node, stack.length);
		stack.push(node);

		for (const edge of graph.get(node) ?? []) {
			const next = edge.to;
			if (!graph.has(next)) continue;

			if (states.get(next) === 1) {
				const cycleStartIndex = stackIndexByNode.get(next);
				const cycleNodes = stack.slice(cycleStartIndex).concat(next);
				const cycleEdges = [];

				for (let index = 0; index < cycleNodes.length - 1; index++) {
					const from = cycleNodes[index];
					const to = cycleNodes[index + 1];
					const cycleEdge = (graph.get(from) ?? []).find((candidateEdge) => candidateEdge.to === to);
					if (cycleEdge) cycleEdges.push(cycleEdge);
				}

				const cycleKey = normalizeCycleKey(cycleNodes);
				if (!seenCycleKeys.has(cycleKey)) {
					seenCycleKeys.add(cycleKey);
					cycles.push({ path: cycleNodes, edges: cycleEdges });
				}
				continue;
			}

			if (!states.get(next)) {
				dfs(next);
			}
		}

		stack.pop();
		stackIndexByNode.delete(node);
		states.set(node, 2);
	}
}

function normalizeCycleKey(cyclePath) {
	const pathWithoutClosingNode = cyclePath.slice(0, -1);
	if (pathWithoutClosingNode.length === 0) return '';

	let best = null;
	for (let index = 0; index < pathWithoutClosingNode.length; index++) {
		const rotated = pathWithoutClosingNode.slice(index).concat(pathWithoutClosingNode.slice(0, index));
		const key = rotated.join('->');
		if (!best || key < best) best = key;
	}
	return best;
}

function getCycleSeverity(edges) {
	const errorTypes = new Set(['build', 'compiles-to', 'runtime']);
	const warningTypes = new Set(['language', 'protocol']);
	const hasErrorType = edges.some((edge) => errorTypes.has(edge.type));
	if (hasErrorType) return 'error';

	const hasWarningType = edges.some((edge) => warningTypes.has(edge.type));
	if (hasWarningType) return 'warn';

	return 'error';
}
