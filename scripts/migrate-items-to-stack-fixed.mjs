import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Read source stack file
const stackPath = path.join(__dirname, 'data/stacks/germany.json');
const stackMetadata = JSON.parse(fs.readFileSync(stackPath, 'utf-8'));

// Read all JSON files from data/items/
const itemsDir = path.join(__dirname, 'data/items/');
const files = fs.readdirSync(itemsDir)
  .filter(file => file.endsWith('.json') && file !== 'README.md')
  .sort();

console.log(`Found ${files.length} item files`);

// Create stack items array
const stackItems = [];

for (const file of files) {
  const itemPath = path.join(itemsDir, file);
  const itemData = JSON.parse(fs.readFileSync(itemPath, 'utf-8'));
  
  // Create correct stack item entry with schema-compliant fields
  const stackItem = {
    itemId: itemData.id,
    status: "approved",
    note: {
      "de": "Integriert in den Deutschland Stack",
      "en": "Integrated into Germany Stack"
    }
  };
  
  stackItems.push(stackItem);
  console.log(`✓ Processed: ${itemData.id}`);
}

// Update the stack metadata with new items
stackMetadata.items = stackItems;

// Write updated stack file
fs.writeFileSync(stackPath, JSON.stringify(stackMetadata, null, 2) + '\n');

console.log(`\n✓ Successfully wrote ${stackItems.length} items to ${stackPath}`);
