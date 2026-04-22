#!/usr/bin/env node
import { readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const root = process.cwd();
const projectsPath = join(root, 'data', 'projects.csv');
const itemsPath = join(root, 'data', 'items');

const parseCsvLine = (line) => {
	const fields = [];
	let current = '';
	let quoted = false;
	for (let i = 0; i < line.length; i++) {
		const ch = line[i];
		if (ch === '"') {
			if (quoted && line[i + 1] === '"') {
				current += '"';
				i++;
			} else {
				quoted = !quoted;
			}
		} else if (ch === ',' && !quoted) {
			fields.push(current);
			current = '';
		} else {
			current += ch;
		}
	}
	fields.push(current);
	return fields;
};

const slugify = (value) =>
	value
		.toLowerCase()
		.normalize('NFD')
		.replace(/\p{Diacritic}/gu, '')
		.replace(/[^a-z0-9]+/g, '-')
		.replace(/^-+|-+$/g, '');

const csv = readFileSync(projectsPath, 'utf-8').trim();
const [headerLine, ...rows] = csv.split('\n');
const headers = parseCsvLine(headerLine);

let updated = 0;
let skipped = 0;

for (const row of rows) {
	if (!row.trim()) {
		continue;
	}
	const values = parseCsvLine(row);
	const entry = Object.fromEntries(headers.map((header, index) => [header, values[index] ?? '']));
	const slug = slugify(entry.project_name || '');
	if (!slug) {
		skipped++;
		continue;
	}

	const itemFile = join(itemsPath, `${slug}.json`);
	let item;
	try {
		item = JSON.parse(readFileSync(itemFile, 'utf-8'));
	} catch {
		skipped++;
		continue;
	}

	const tags = (entry.tag || '')
		.split(',')
		.map((tag) => tag.trim())
		.filter(Boolean);
	if (tags.length > 0) {
		item.tags = tags;
	}

	if (entry.maturity === 'incubating') {
		item.maturity = 'incubation';
	} else if (entry.maturity) {
		item.maturity = entry.maturity;
	}

	if (entry.last_security_audit_date) {
		item.audit = {
			...(item.audit || {}),
			lastDate: entry.last_security_audit_date,
		};
	}

	writeFileSync(itemFile, `${JSON.stringify(item, null, '\t')}\n`, 'utf-8');
	updated++;
}

console.log(`Synced D-Stack metadata for ${updated} items (${skipped} skipped).`);
