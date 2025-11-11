#!/usr/bin/env bun
/**
 * Generate statistics for dictionary files
 */

import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const DICT_DIR = join(import.meta.dir, '..', 'dictionaries');

console.log('📊 Dictionary Statistics\n');
console.log('═'.repeat(60));

const dictFiles = readdirSync(DICT_DIR)
  .filter(f => f.endsWith('.txt'))
  .sort();

let totalWords = 0;

interface DictStats {
  file: string;
  words: number;
  comments: number;
  empty: number;
  total: number;
}

const stats: DictStats[] = [];

for (const file of dictFiles) {
  const filePath = join(DICT_DIR, file);
  const content = readFileSync(filePath, 'utf8');
  const lines = content.split('\n');

  let wordCount = 0;
  let commentCount = 0;
  let emptyCount = 0;

  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed) {
      emptyCount++;
    } else if (trimmed.startsWith('#')) {
      commentCount++;
    } else {
      wordCount++;
    }
  }

  totalWords += wordCount;

  stats.push({
    file,
    words: wordCount,
    comments: commentCount,
    empty: emptyCount,
    total: lines.length
  });

  console.log(`\n📖 ${file}`);
  console.log(`   Words: ${wordCount}`);
  console.log(`   Comments: ${commentCount}`);
  console.log(`   Empty lines: ${emptyCount}`);
  console.log(`   Total lines: ${lines.length}`);
}

console.log('\n' + '═'.repeat(60));
console.log(`\n📈 Total words across all dictionaries: ${totalWords}`);
console.log(`📚 Number of dictionary files: ${dictFiles.length}\n`);

// Export stats if needed
export { stats, totalWords };
