import fs from 'fs';

const filePath = './data/items.csv';

// Read the file
let content = fs.readFileSync(filePath, 'utf8');

// Store original size
const originalSize = content.length;

// Replace the pattern: logos/[a-f0-9]{64}.png with empty string
// The pattern should match exactly 64 hex characters
const pattern = /logos\/[a-f0-9]{64}\.png/g;

const matches = content.match(pattern);
if (matches) {
  console.log(`Found ${matches.length} matching logo paths to remove`);
  matches.forEach(match => console.log(`  - ${match}`));
} else {
  console.log(`No matching logo paths found with pattern: logos/[a-f0-9]{64}.png`);
}

const modifiedContent = content.replace(pattern, '');

// Write back to file
fs.writeFileSync(filePath, modifiedContent, 'utf8');

const newSize = modifiedContent.length;
console.log(`\nFile processing complete:`);
console.log(`- Original size: ${originalSize} bytes`);
console.log(`- New size: ${newSize} bytes`);
console.log(`- Bytes removed: ${originalSize - newSize}`);
