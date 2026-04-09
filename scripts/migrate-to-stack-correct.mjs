import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const itemsDir = path.join(__dirname, 'data', 'items');
const stacksDir = path.join(__dirname, 'data', 'stacks');

// Read the current germany.json to preserve the header
const germanyPath = path.join(stacksDir, 'germany.json');
const stackHeader = JSON.parse(fs.readFileSync(germanyPath, 'utf-8'));

// Extract header fields to preserve
const preservedHeader = {
  id: stackHeader.id,
  name: stackHeader.name,
  description: stackHeader.description,
  country: stackHeader.country,
  issuer: stackHeader.issuer,
  version: stackHeader.version,
  publishedAt: stackHeader.publishedAt
};

// Read all .json files from data/items/
const files = fs.readdirSync(itemsDir).filter(file => {
  return file.endsWith('.json') && file !== 'README.md';
});

console.log(`Found ${files.length} item files`);

// Extract IDs and create stack items
const stackItems = files.map(file => {
  const itemPath = path.join(itemsDir, file);
  const itemData = JSON.parse(fs.readFileSync(itemPath, 'utf-8'));
  
  return {
    itemId: itemData.id,
    status: "approved",
    role: "consumer",
    rationale: {
      "de": "Integriert in den Deutschland Stack",
      "en": "Integrated into Germany Stack"
    },
    alternatives: []
  };
});

console.log(`Created ${stackItems.length} stack items`);

// Create the new stack object
const newStack = {
  ...preservedHeader,
  items: stackItems
};

// Write to germany.json
fs.writeFileSync(germanyPath, JSON.stringify(newStack, null, 2) + '\n');
console.log(`\nSuccessfully wrote ${stackItems.length} items to ${germanyPath}`);
