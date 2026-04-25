#!/usr/bin/env node
/**
 * Husky hooks setup script
 *
 * Idempotent setup for git pre-commit hooks
 * Ensures lint-staged runs before commits
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');
const huskyDir = path.join(rootDir, '.husky');
const preCommitHookPath = path.join(huskyDir, 'pre-commit');

const preCommitContent = `#!/bin/sh
. "$(dirname "$0")/_/husky.sh"

pnpm exec lint-staged
`;

function setupHusky() {
  try {
    // Create .husky directory if it doesn't exist
    if (!fs.existsSync(huskyDir)) {
      fs.mkdirSync(huskyDir, { recursive: true });
    }

    // Create pre-commit hook
    fs.writeFileSync(preCommitHookPath, preCommitContent, { mode: 0o755 });

    console.log('✓ Husky pre-commit hook set up successfully');
    return true;
  } catch (err) {
    console.warn('⚠ Failed to set up Husky hooks:', err.message);
    return false;
  }
}

// Run setup if this is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  setupHusky();
}

export { setupHusky };
