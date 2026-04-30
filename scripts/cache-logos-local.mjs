#!/usr/bin/env node

/**
 * Downloads externally referenced logos from src/data/logo-urls.json
 * and rewrites each entry to a local repo path (public/logos/*) so
 * PWA offline mode can render all logos without network access.
 *
 * Usage:
 *   node scripts/cache-logos-local.mjs
 */

import { existsSync, mkdirSync, writeFileSync } from 'fs';
import { dirname, extname, join } from 'path';
import { fileURLToPath } from 'url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const ITEMS_DIR = join(ROOT, 'data', 'items');
const LOGO_DIR = join(ROOT, 'public', 'logos');
const USER_AGENT = 'accessible-d-stack-landscape/1.0';
const TIMEOUT_MS = 5_000;
const CONCURRENCY = 6;

function isHttpUrl(value) {
	return /^https?:\/\//i.test(value || '');
}

function slugifyName(name) {
	return (
		name
			.toLowerCase()
			.normalize('NFKD')
			.replace(/[\u0300-\u036f]/g, '')
			.replace(/[^a-z0-9]+/g, '-')
			.replace(/^-+|-+$/g, '') || 'logo'
	);
}

function extensionFromContentType(contentType) {
	const normalized = (contentType || '').toLowerCase();
	if (normalized.includes('image/svg')) return '.svg';
	if (normalized.includes('image/png')) return '.png';
	if (normalized.includes('image/webp')) return '.webp';
	if (normalized.includes('image/avif')) return '.avif';
	if (normalized.includes('image/jpeg')) return '.jpg';
	if (normalized.includes('image/gif')) return '.gif';
	if (normalized.includes('image/x-icon') || normalized.includes('image/vnd.microsoft.icon')) return '.ico';
	return null;
}

function extensionFromUrl(url) {
	try {
		const pathname = new URL(url).pathname;
		const ext = extname(pathname).toLowerCase();
		if (['.svg', '.png', '.webp', '.avif', '.jpg', '.jpeg', '.gif', '.ico'].includes(ext)) {
			return ext === '.jpeg' ? '.jpg' : ext;
		}
	} catch {
		// ignore
	}
	return null;
}

function localLogoExists(path) {
	const normalized = String(path || '').replace(/^\/+/, '');
	return existsSync(join(ROOT, 'public', normalized));
}

async function fetchBinary(url) {
	const controller = new AbortController();
	const timeout = setTimeout(() => controller.abort(), TIMEOUT_MS);
	try {
		const response = await fetch(url, {
			method: 'GET',
			headers: { 'User-Agent': USER_AGENT },
			signal: controller.signal,
			redirect: 'follow',
		});
		if (!response.ok) return null;
		const bytes = new Uint8Array(await response.arrayBuffer());
		const contentType = response.headers.get('content-type') || '';
		return { bytes, contentType };
	} catch {
		return null;
	} finally {
		clearTimeout(timeout);
	}
}

import { readdirSync } from 'fs';

async function main() {
	mkdirSync(LOGO_DIR, { recursive: true });

	const files = readdirSync(ITEMS_DIR).filter((f) => f.endsWith('.json'));
	const names = files.map((f) => f.replace(/\.json$/, ''));
	const logs = new Array(names.length);

	let cached = 0;
	let failed = 0;
	const missingNames = [];

	let nextTaskIndex = 0;

	// Hilfsfunktion für Devicon-Slug
	function deviconSlug(name) {
		// Devicon nutzt meist den reinen Namen (ohne Bindestriche), manchmal mit Sonderfällen
		// z.B. 'mysql-server' => 'mysql', 'nodejs' => 'nodejs', 'vuejs' => 'vue', 'java' => 'java'
		// Wir nehmen den ersten Teil vor Bindestrich, falls vorhanden
		return name.split('-')[0].toLowerCase();
	}

	const tasks = names.map((name, idx) => {
		const slug = slugifyName(name);
		const simpleIconsSlug = slug.replace(/-/g, '');
		const devicon = deviconSlug(name);
		return {
			index: idx,
			name,
			slug,
			url: `https://cdn.simpleicons.org/${simpleIconsSlug}`,
			deviconUrl: `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${devicon}/${devicon}-original.svg`,
		};
	});

	async function worker() {
		while (nextTaskIndex < tasks.length) {
			const task = tasks[nextTaskIndex++];
			let fetched = await fetchBinary(task.url);
			let usedSource = 'SimpleIcons';

			// Fallback: Devicon, falls SimpleIcons fehlschlägt
			if (!fetched) {
				fetched = await fetchBinary(task.deviconUrl);
				usedSource = 'Devicon';
			}

			if (!fetched) {
				failed++;
				logs[task.index] = `  ${task.name} … ❌ download failed (SimpleIcons & Devicon)`;
				missingNames.push(task.name);
				continue;
			}

			const ext = extensionFromContentType(fetched.contentType) ?? extensionFromUrl(task.url) ?? '.svg';
			const filename = `${task.slug}${ext}`;
			const filePath = join(LOGO_DIR, filename);
			writeFileSync(filePath, fetched.bytes);

			// Prüfe, ob die Datei leer ist, und lösche sie ggf.
			try {
				const { size } = await import('fs').then((fs) => fs.statSync(filePath));
				if (size === 0) {
					await import('fs').then((fs) => fs.unlinkSync(filePath));
					logs[task.index] = `  ${task.name} … ⚠️ leere Datei gelöscht (${filename}) [${usedSource}]`;
					failed++;
					continue;
				}
			} catch (e) {
				logs[task.index] = `  ${task.name} … ⚠️ Fehler bei Dateiprüfung (${filename}) [${usedSource}]`;
				failed++;
				continue;
			}

			cached++;
			logs[task.index] = `  ${task.name} … ✅ ${filename} [${usedSource}]`;
		}
	}

	await Promise.all(Array.from({ length: Math.min(CONCURRENCY, tasks.length) }, () => worker()));

	for (const line of logs) {
		if (line) console.log(line);
	}

	if (missingNames.length > 0) {
		const logPath = join(LOGO_DIR, '..', 'missing-logos.log');
		writeFileSync(logPath, missingNames.join('\n') + '\n', 'utf-8');
		console.log(`\nMissing logos written to: ${logPath}`);
	}

	console.log('\n📊 Local logo cache summary');
	console.log(`   Total entries: ${names.length}`);
	console.log(`   Cached now:    ${cached}`);
	console.log(`   Failed:        ${failed}`);
}

main().catch((error) => {
	console.error(error);
	process.exit(1);
});
