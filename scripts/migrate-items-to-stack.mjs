import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ITEMS_DIR = path.join(__dirname, 'data', 'items');
const STACK_FILE = path.join(__dirname, 'data', 'stacks', 'germany.json');

// Read all JSON files from data/items/
const files = fs.readdirSync(ITEMS_DIR).filter(file => {
  return file.endsWith('.json') && file !== 'README.md';
});

console.log(`Found ${files.length} JSON files to process...\n`);

// Process each file and extract IDs
const items = [];
files.forEach(file => {
  const filePath = path.join(ITEMS_DIR, file);
  const content = fs.readFileSync(filePath, 'utf-8');
  const data = JSON.parse(content);
  
  // Create stack item entry according to schema
  const stackItem = {
    itemId: data.id,
    status: 'approved',
    note: {
      de: 'Integriert in den Deutschland Stack',
      en: 'Integrated into Germany Stack'
    }
  };
  
  items.push(stackItem);
  console.log(`✓ Added: ${data.id}`);
});

// Read existing stack file
const stackData = JSON.parse(fs.readFileSync(STACK_FILE, 'utf-8'));

// Update items in stack
stackData.items = items;

// Write back to germany.json
fs.writeFileSync(STACK_FILE, JSON.stringify(stackData, null, '\t') + '\n');

console.log(`\n✅ Successfully migrated ${items.length} items to data/stacks/germany.json`);
