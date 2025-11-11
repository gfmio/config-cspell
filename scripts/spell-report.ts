#!/usr/bin/env bun
/**
 * Generate a spell check report
 */

import { $ } from 'bun';

const CONFIG_FILE = process.argv[2] || 'cspell.json';
const GLOB_PATTERN = process.argv[3] || '**/*';

console.log('📝 Spell Check Report\n');
console.log(`Config: ${CONFIG_FILE}`);
console.log(`Pattern: ${GLOB_PATTERN}\n`);
console.log('═'.repeat(60));

interface SpellError {
  file: string;
  lineNum: string;
  col: string;
  word: string;
}

try {
  // Use Bun's $ for shell commands
  const result = await $`cspell --config ${CONFIG_FILE} ${GLOB_PATTERN} --no-progress --show-context`.quiet();

  console.log('\n✅ No spelling errors found!\n');

} catch (error: unknown) {
  const output = error && typeof error === 'object' && 'stdout' in error
    ? String(error.stdout)
    : '';

  // Parse output
  const lines = output.split('\n');
  const errors: SpellError[] = [];
  let currentFile: string | null = null;

  for (const line of lines) {
    if (line.includes(' - Unknown word')) {
      const match = line.match(/^(.+?):(\d+):(\d+) - Unknown word \((.+?)\)/);
      if (match) {
        const [, file, lineNum, col, word] = match;
        if (file !== currentFile) {
          currentFile = file;
        }
        errors.push({ file, lineNum, col, word });
      }
    }
  }

  if (errors.length > 0) {
    console.log(`\n❌ Found ${errors.length} spelling error(s):\n`);

    // Group by file
    const byFile: Record<string, SpellError[]> = {};
    for (const err of errors) {
      if (!byFile[err.file]) {
        byFile[err.file] = [];
      }
      byFile[err.file].push(err);
    }

    for (const [file, fileErrors] of Object.entries(byFile)) {
      console.log(`\n📄 ${file} (${fileErrors.length} error(s))`);
      for (const err of fileErrors) {
        console.log(`   Line ${err.lineNum}:${err.col} - "${err.word}"`);
      }
    }

    console.log('\n' + '═'.repeat(60));
    console.log(`\nTotal files with errors: ${Object.keys(byFile).length}`);
    console.log(`Total errors: ${errors.length}\n`);

    process.exit(1);
  } else {
    console.log(output);
  }
}
