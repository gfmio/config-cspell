#!/usr/bin/env bun
/**
 * Validate all CSpell configuration files
 */

import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const ROOT_DIR = join(import.meta.dir, '..');

interface CSpellConfig {
  version?: string;
  $schema?: string;
  dictionaryDefinitions?: Array<{
    name: string;
    path: string;
    description?: string;
  }>;
  import?: string[];
  [key: string]: unknown;
}

// Find all JSON config files
const configFiles = readdirSync(ROOT_DIR)
  .filter(file => file.endsWith('.json') && file !== 'package.json' && file !== 'tsconfig.json');

console.log('🔍 Validating CSpell configuration files...\n');

let errors = 0;
let warnings = 0;

for (const file of configFiles) {
  const filePath = join(ROOT_DIR, file);

  try {
    // 1. Validate JSON syntax
    const content = readFileSync(filePath, 'utf8');
    const config: CSpellConfig = JSON.parse(content);

    // 2. Check required fields
    if (!config.version) {
      console.error(`❌ ${file}: Missing 'version' field`);
      errors++;
    }

    if (config.version !== '0.2') {
      console.warn(`⚠️  ${file}: Version should be '0.2', got '${config.version}'`);
      warnings++;
    }

    // 3. Check schema
    if (!config.$schema) {
      console.warn(`⚠️  ${file}: Missing '$schema' field`);
      warnings++;
    }

    // 4. Validate dictionary definitions
    if (config.dictionaryDefinitions) {
      for (const dict of config.dictionaryDefinitions) {
        const dictPath = join(ROOT_DIR, dict.path);
        if (!existsSync(dictPath)) {
          console.error(`❌ ${file}: Dictionary file not found: ${dict.path}`);
          errors++;
        }
      }
    }

    // 5. Validate imports
    if (config.import) {
      for (const importPath of config.import) {
        if (importPath.startsWith('./')) {
          const importFile = join(ROOT_DIR, importPath);
          if (!existsSync(importFile)) {
            console.error(`❌ ${file}: Import file not found: ${importPath}`);
            errors++;
          }
        }
      }
    }

    console.log(`✅ ${file}: Valid`);

  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.error(`❌ ${file}: ${message}`);
    errors++;
  }
}

// Check dictionary files exist
console.log('\n🔍 Validating dictionary files...\n');

const dictDir = join(ROOT_DIR, 'dictionaries');
if (existsSync(dictDir)) {
  const dictFiles = readdirSync(dictDir).filter(f => f.endsWith('.txt'));

  for (const file of dictFiles) {
    const filePath = join(dictDir, file);
    const content = readFileSync(filePath, 'utf8');
    const lines = content.split('\n');

    // Check for common issues
    let hasContent = false;
    for (const line of lines) {
      if (line.trim() && !line.startsWith('#')) {
        hasContent = true;
        break;
      }
    }

    if (!hasContent) {
      console.warn(`⚠️  dictionaries/${file}: File appears to be empty`);
      warnings++;
    } else {
      console.log(`✅ dictionaries/${file}: Valid`);
    }
  }
}

console.log(`\n📊 Summary:`);
console.log(`   Configs checked: ${configFiles.length}`);
console.log(`   Errors: ${errors}`);
console.log(`   Warnings: ${warnings}`);

if (errors > 0) {
  console.log('\n❌ Validation failed!');
  process.exit(1);
} else if (warnings > 0) {
  console.log('\n⚠️  Validation passed with warnings');
  process.exit(0);
} else {
  console.log('\n✅ All validations passed!');
  process.exit(0);
}
