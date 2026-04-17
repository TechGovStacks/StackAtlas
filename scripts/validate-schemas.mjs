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
const itemSchemaFile = 'data/schemas/item.schema.json';

const args = new Set(process.argv.slice(2));
const cycleCheckEnabled = args.has('--check-cycles');

const ajv = new Ajv({ allErrors: true });
addFormats(ajv);

// Define schema and data mappings
const validationMap = [
	{
		schemaFile: 'data/schemas/layer.schema.json',
		dataDir: 'data/layers',
		name: 'Layer',
	},
	{
		schemaFile: itemSchemaFile,
		dataDir: 'data/items',
		name: 'Item',
	},
	{
		schemaFile: 'data/schemas/stack.schema.json',
		dataDir: 'data/stacks',
		name: 'Stack',
	},
];

let totalFiles = 0;
let validFiles = 0;
let totalErrors = 0;
let totalWarnings = 0;

const semanticErrorMessages = [];

console.log('🔍 JSON Schema Validation - Starting...\n');

for (const { schemaFile, dataDir, name } of validationMap) {
	const schemaPath = path.join(projectRoot, schemaFile);
	const dataDirPath = path.join(projectRoot, dataDir);

	// Load schema
	if (!fs.existsSync(schemaPath)) {
		console.error(`❌ Schema not found: ${schemaFile}`);
		totalErrors++;
		continue;
	}

	let schema;
	try {
		schema = JSON.parse(fs.readFileSync(schemaPath, 'utf8'));
	} catch (e) {
		console.error(`❌ Invalid schema JSON: ${schemaFile}`);
		console.error(`   ${e.message}`);
		totalErrors++;
		continue;
	}

	const validate = ajv.compile(schema);

	// Check data directory
	if (!fs.existsSync(dataDirPath)) {
		console.warn(`⚠️  Data directory not found: ${dataDir}`);
		continue;
	}

	// Get all JSON files
	const files = fs
		.readdirSync(dataDirPath)
		.filter((f) => f.endsWith('.json') && f !== '.gitkeep.json')
		.sort();

	if (files.length === 0) {
		console.warn(`⚠️  No JSON files in: ${dataDir}`);
		continue;
	}

	console.log(`📋 Validating ${name}s (${files.length} files):`);

	let categoryValid = 0;
	let categoryErrors = 0;

	for (const file of files) {
		totalFiles++;
		const filePath = path.join(dataDirPath, file);

		try {
			const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
			const valid = validate(data);

			if (valid) {
				validFiles++;
				categoryValid++;
				process.stdout.write('.');
			} else {
				categoryErrors++;
				totalErrors++;
				process.stdout.write('✗');

				console.log();
				console.log(`   ❌ ${file}`);
				for (const error of validate.errors) {
					console.log(`      - ${error.instancePath || '/'} ${error.schemaPath}: ${error.message}`);
				}
			}
		} catch (e) {
			categoryErrors++;
			totalErrors++;
			process.stdout.write('✗');
			console.log();
			console.log(`   ❌ ${file}: ${e.message}`);
		}
	}

	console.log(`\n   ✓ ${categoryValid}/${files.length} valid\n`);
}

runDependencySemanticChecks();

if (cycleCheckEnabled) {
	runCycleChecks();
}

// Summary
console.log('\n📊 Summary');
console.log('─'.repeat(40));
console.log(`Total files:  ${totalFiles}`);
console.log(`Valid:        ${validFiles}`);
console.log(`Warnings:     ${totalWarnings}`);
console.log(`Errors:       ${totalErrors}`);

if (totalErrors === 0) {
	console.log('\n✅ All validations passed!');
	process.exit(0);
} else {
	console.log(`\n❌ Validation failed with ${totalErrors} error(s)`);
	process.exit(1);
}

function getItemRecords() {
	if (!fs.existsSync(itemDataDir)) {
		semanticErrorMessages.push('Items directory not found: data/items');
		return [];
	}

	return fs
		.readdirSync(itemDataDir)
		.filter((file) => file.endsWith('.json') && file !== '.gitkeep.json')
		.sort()
		.map((file) => {
			const filePath = path.join(itemDataDir, file);
			try {
				const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
				return { file, data };
			} catch (error) {
				semanticErrorMessages.push(`${file}: invalid JSON (${error.message})`);
				return null;
			}
		})
		.filter(Boolean);
}

function runDependencySemanticChecks() {
	console.log('🔗 Dependency semantic checks:');

	const itemRecords = getItemRecords();
	if (itemRecords.length === 0) {
		totalWarnings++;
		console.warn('   ⚠️  No item data available for dependency checks');
		return;
	}

	const itemIdSet = new Set(itemRecords.map(({ data }) => data.id).filter(Boolean));
	const edgeKeysByItem = new Map();

	for (const { file, data: item } of itemRecords) {
		const dependencies = Array.isArray(item.dependencies) ? item.dependencies : [];
		const sourceId = item.id;

		if (!sourceId) {
			semanticErrorMessages.push(`${file}: missing item.id for dependency validation`);
			continue;
		}

		if (!edgeKeysByItem.has(sourceId)) {
			edgeKeysByItem.set(sourceId, new Set());
		}

		const seenEdges = edgeKeysByItem.get(sourceId);

		for (const dependency of dependencies) {
			const targetItemId = dependency?.targetItemId;
			const type = dependency?.type;
			const scope = dependency?.scope ?? 'required';
			const edgeKey = `${targetItemId}::${type}::${scope}`;

			if (!itemIdSet.has(targetItemId)) {
				semanticErrorMessages.push(`${file}: dependency target '${targetItemId}' does not exist in data/items`);
			}

			if (sourceId === targetItemId) {
				semanticErrorMessages.push(`${file}: self-dependency is not allowed (${sourceId} -> ${targetItemId})`);
			}

			if (seenEdges.has(edgeKey)) {
				semanticErrorMessages.push(`${file}: duplicate dependency edge detected (${sourceId} -> ${targetItemId}, type=${type}, scope=${scope})`);
			} else {
				seenEdges.add(edgeKey);
			}
		}
	}

	for (const message of semanticErrorMessages) {
		totalErrors++;
		console.error(`   ❌ ${message}`);
	}

	if (semanticErrorMessages.length === 0) {
		console.log('   ✅ Dependency semantics passed');
	}

	console.log('');
}

function runCycleChecks() {
	console.log('🧭 Dependency cycle checks:');

	const itemRecords = getItemRecords();
	if (itemRecords.length === 0) {
		totalWarnings++;
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
			totalErrors++;
			console.error(`   ❌ [ERROR] Cycle detected: ${path}`);
		} else {
			totalWarnings++;
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
				const cycleNodes = stack.slice(cycleStartIndex);
				cycleNodes.push(next);

				const cycleEdges = [];
				for (let i = 0; i < cycleNodes.length - 1; i++) {
					const from = cycleNodes[i];
					const to = cycleNodes[i + 1];
					const cycleEdge = (graph.get(from) ?? []).find((currentEdge) => currentEdge.to === to);
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
	for (let i = 0; i < pathWithoutClosingNode.length; i++) {
		const rotated = pathWithoutClosingNode.slice(i).concat(pathWithoutClosingNode.slice(0, i));
		const key = rotated.join('->');
		if (!best || key < best) best = key;
	}

	return best;
}

function getCycleSeverity(edges) {
	const hardDependencyTypes = new Set(['build', 'compiles-to', 'runtime']);
	const hasHardType = edges.some((edge) => hardDependencyTypes.has(edge.type));
	const hasRequiredScope = edges.some((edge) => edge.scope === 'required');
	return hasHardType || hasRequiredScope ? 'error' : 'warn';
}
