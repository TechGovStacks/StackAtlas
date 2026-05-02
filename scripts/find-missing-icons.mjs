#!/usr/bin/env node

/**
 * Finds missing icons/logos for items
 *
 * Usage:
 *   node scripts/find-missing-icons.mjs [--output=report.json]
 */

import { readdirSync, readFileSync, existsSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const ITEMS_DIR = join(ROOT, 'data', 'items');
const LOGOS_DIR = join(ROOT, 'public', 'logos');
const OUTPUT_FILE = process.argv.find((arg) => arg.startsWith('--output='))?.split('=')[1] || 'missing-icons-report.json';

function slugifyName(name) {
	return (
		name
			.toLowerCase()
			.normalize('NFKD')
			.replace(/[̀-ͯ]/g, '')
			.replace(/[^a-z0-9]+/g, '-')
			.replace(/^-+|-+$/g, '') || 'logo'
	);
}

function main() {
	try {
		// Get all item files
		const itemFiles = readdirSync(ITEMS_DIR).filter((f) => f.endsWith('.json'));
		const loggedItems = itemFiles.map((f) => f.replace('.json', ''));

		// Get all existing logos
		const existingLogos = new Set(
			readdirSync(LOGOS_DIR)
				.filter((f) => f.endsWith('.svg'))
				.map((f) => f.replace('.svg', ''))
		);

		console.log(`📊 Audit Results:`);
		console.log(`   Total items: ${loggedItems.length}`);
		console.log(`   Existing logos: ${existingLogos.size}`);

		const missing = [];
		const available = [];

		for (const itemName of loggedItems) {
			const slug = slugifyName(itemName);
			if (existingLogos.has(slug)) {
				available.push({ name: itemName, slug });
			} else {
				missing.push({ name: itemName, slug });
			}
		}

		console.log(`   ✅ Available: ${available.length}`);
		console.log(`   ❌ Missing: ${missing.length}`);

		if (missing.length > 0) {
			console.log(`\n🔍 Missing icons (first 20):`);
			missing.slice(0, 20).forEach(({ name }) => {
				console.log(`   - ${name}`);
			});

			if (missing.length > 20) {
				console.log(`   ... and ${missing.length - 20} more`);
			}
		}

		// Save detailed report
		const report = {
			timestamp: new Date().toISOString(),
			summary: {
				total: loggedItems.length,
				available: available.length,
				missing: missing.length,
				percentageComplete: ((available.length / loggedItems.length) * 100).toFixed(2) + '%',
			},
			missing: missing.map((m) => m.name),
		};

		writeFileSync(join(ROOT, OUTPUT_FILE), JSON.stringify(report, null, 2), 'utf-8');
		console.log(`\n📋 Detailed report saved to: ${OUTPUT_FILE}`);

		process.exit(missing.length > 0 ? 1 : 0);
	} catch (error) {
		console.error('❌ Error:', error.message);
		process.exit(1);
	}
}

main();
