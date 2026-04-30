#!/usr/bin/env node

/**
 * Validates logo URLs and reports dead or unreachable links
 *
 * Usage:
 *   node scripts/validate-logo-urls.mjs [--report] [--timeout=5000]
 *
 * Options:
 *   --report    Create a validation report
 *   --timeout   Request timeout in milliseconds (default: 5000)
 */

import { readFileSync, writeFileSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const LOGO_URLS_JSON = join(ROOT, 'src', 'data', 'logo-urls.json');
const REPORT_FILE = join(ROOT, 'logo-validation-report.json');

const ARGS = {
	report: process.argv.includes('--report'),
	timeout: parseInt(process.argv.find((arg) => arg.startsWith('--timeout='))?.split('=')[1] || '5000'),
};

/**
 * Check if URL is accessible
 */
async function checkUrl(url) {
	try {
		const controller = new AbortController();
		const timeoutId = setTimeout(() => controller.abort(), ARGS.timeout);

		const response = await fetch(url, {
			method: 'HEAD',
			signal: controller.signal,
			redirect: 'follow',
		});

		clearTimeout(timeoutId);
		return {
			accessible: response.ok,
			status: response.status,
			error: null,
		};
	} catch (error) {
		// Retry with GET for URLs that don't support HEAD
		try {
			const controller = new AbortController();
			const timeoutId = setTimeout(() => controller.abort(), ARGS.timeout);

			const response = await fetch(url, {
				method: 'GET',
				signal: controller.signal,
				redirect: 'follow',
			});

			clearTimeout(timeoutId);
			return {
				accessible: response.ok,
				status: response.status,
				error: null,
			};
		} catch (retryError) {
			return {
				accessible: false,
				status: null,
				error: retryError.message,
			};
		}
	}
}

/**
 * Main validation function
 */
async function main() {
	try {
		const content = readFileSync(LOGO_URLS_JSON, 'utf-8');
		const logoMap = JSON.parse(content);

		console.log(`🔍 Validating ${Object.keys(logoMap).length} logo URLs...\n`);

		const results = {
			valid: [],
			broken: [],
			redirected: [],
			timestamp: new Date().toISOString(),
		};

		let checked = 0;
		let valid = 0;
		let broken = 0;

		for (const [name, logoData] of Object.entries(logoMap)) {
			const url = logoData.url;
			if (!url) {
				console.log(`⚠️  ${name}: No URL`);
				continue;
			}

			process.stdout.write(`Checking ${name}... `);

			const result = await checkUrl(url);

			if (result.accessible) {
				console.log(`✅ OK (${result.status})`);
				results.valid.push({ name, url, status: result.status });
				valid++;
			} else if (result.status === 301 || result.status === 302) {
				console.log(`🔄 Redirected (${result.status})`);
				results.redirected.push({ name, url, status: result.status });
			} else {
				console.log(`❌ Broken (${result.status || result.error})`);
				results.broken.push({ name, url, status: result.status, error: result.error });
				broken++;
			}

			checked++;

			// Rate limiting
			await new Promise((resolve) => setTimeout(resolve, 200));
		}

		// Save report if requested
		if (ARGS.report) {
			writeFileSync(REPORT_FILE, JSON.stringify(results, null, 2), 'utf-8');
			console.log(`\n📋 Report saved to: ${REPORT_FILE}`);
		}

		// Summary
		console.log(`\n📊 Results:`);
		console.log(`   Checked: ${checked}`);
		console.log(`   ✅ Valid: ${valid}`);
		console.log(`   ❌ Broken: ${broken}`);
		console.log(`   🔄 Redirected: ${results.redirected.length}`);

		if (broken > 0) {
			console.log(`\n⚠️  Broken URLs found:`);
			for (const item of results.broken) {
				console.log(`   - ${item.name}: ${item.url}`);
			}
		}

		process.exit(broken > 0 ? 1 : 0);
	} catch (error) {
		console.error('❌ Error:', error.message);
		process.exit(1);
	}
}

main();
