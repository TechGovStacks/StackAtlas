#!/usr/bin/env node

import { readFileSync } from 'fs';
import { resolve } from 'path';
import sharp from 'sharp';

const iconDir = resolve('./public/icons');
const svgPath = resolve('./public/favicon.svg');

// Icon sizes to generate
const sizes = [
	{ name: 'apple-touch-icon.png', size: 180 },
	{ name: 'pwa-192x192.png', size: 192 },
	{ name: 'pwa-512x512.png', size: 512 },
];

async function generateIcons() {
	try {
		const svgBuffer = readFileSync(svgPath);

		for (const { name, size } of sizes) {
			const outputPath = resolve(iconDir, name);
			await sharp(svgBuffer)
				.png()
				.resize(size, size, { fit: 'contain', background: { r: 0, g: 61, b: 130, alpha: 1 } })
				.toFile(outputPath);
			console.log(`✅ Generated ${name} (${size}×${size})`);
		}
	} catch (error) {
		console.error('❌ Icon generation failed:', error.message);
		process.exit(1);
	}
}

generateIcons();
