# CSpell Shareable Configuration Expert Guide

## Project Overview

This project creates shareable CSpell (Code Spell Checker) configurations that can be imported and extended across multiple projects. The goal is to provide reusable, well-maintained spell-checking configurations that enforce consistent standards.

## Core Expertise Areas

### 1. CSpell Configuration Architecture

#### Configuration File Formats

CSpell supports multiple configuration file formats:

- **JSON**: `.cspell.json`, `cspell.json`, `cspell.config.json`
- **YAML**: `cspell.yaml`, `cspell.yml`, `cspell.config.yaml`, `cspell.config.yml`
- **JavaScript/CommonJS**: `cspell.config.js`, `cspell.config.cjs`
- **TOML**: `cspell.config.toml`
- **package.json**: Using the `cspell` field

**Best Practice**: Use JSON format (`.cspell.json`) for shareable configs as it's the most portable and doesn't require a build step.

#### Configuration Discovery Order

CSpell searches for configuration files in this order:

1. `.cspell.json`, `cspell.json`, `.cSpell.json`, `cSpell.json`
2. `cspell.config.js`, `cspell.config.cjs`, `cspell.config.json`
3. `cspell.config.yaml`, `cspell.config.yml`, `cspell.config.toml`
4. `cspell.yaml`, `cspell.yml`
5. `package.json` (cspell field)

### 2. Import and Extension Mechanism

#### How Import Works

- The `import` field lists configuration files to be imported in order
- Files are merged sequentially: first to last, then the parent config
- Later settings override earlier conflicting settings
- Dictionary entries are combined (not replaced)

#### Import Syntax

```json
{
  "version": "0.2",
  "import": [
    "./base-config.json",
    "@org/cspell-config",
    "@org/cspell-config/typescript"
  ]
}
```

#### Merging Behavior

- **Dictionaries**: Combined additively
- **Words arrays**: Combined additively
- **Boolean flags**: Later values override
- **Numbers/strings**: Later values override
- **Negation**: Use `!` prefix to disable dictionaries (e.g., `!html`)

### 3. Essential Configuration Properties

#### Always Include

```json
{
  "version": "0.2"
}
```

#### Core Settings

- **`language`**: Locale code (e.g., `"en"`, `"en-GB"`, `"en-US"`)
- **`words`**: Array of correctly-spelled words to add
- **`ignoreWords`**: Words to ignore (not flagged as errors)
- **`flagWords`**: Words that should always be flagged as incorrect
- **`dictionaries`**: Array of dictionary names to enable
- **`dictionaryDefinitions`**: Define custom dictionaries

#### Performance Settings

- **`maxNumberOfProblems`**: Limit problems per file (default: 100)
- **`minWordLength`**: Minimum word length to check (default: 4)
- **`allowCompoundWords`**: Allow compound words without spaces (default: false)

#### File/Path Filtering

- **`ignorePaths`**: Glob patterns for paths to ignore (e.g., `node_modules/**`, `*.min.js`)
- **`ignoreRegExpList`**: Array of regex patterns to ignore in file content
- **`includeRegExpList`**: Only check text matching these patterns

#### Language-Specific Overrides

```json
{
  "languageSettings": [
    {
      "languageId": "typescript,javascript",
      "dictionaries": ["typescript", "node", "npm"]
    }
  ]
}
```

#### Glob Pattern Overrides

```json
{
  "overrides": [
    {
      "filename": "**/*.md",
      "language": "en",
      "dictionaries": ["markdown", "en-common"]
    }
  ]
}
```

### 4. Dictionary Management

#### Built-in Dictionaries

CSpell includes many built-in dictionaries:

- Programming languages: `typescript`, `javascript`, `python`, `rust`, `go`, `java`, `cpp`, `csharp`, etc.
- Frameworks: `node`, `npm`, `react`, `angular`, `vue`, etc.
- Technologies: `html`, `css`, `bash`, `docker`, `git`, etc.
- General: `en`, `en-GB`, `en-US`, `companies`, `softwareTerms`, etc.

**Find available dictionaries**: Check `@cspell/dict-*` packages on npm

#### Enabling/Disabling Dictionaries

```json
{
  "dictionaries": [
    "typescript",
    "node",
    "!html"  // Disable HTML dictionary
  ]
}
```

#### Custom Dictionary Definitions

```json
{
  "dictionaryDefinitions": [
    {
      "name": "project-terms",
      "path": "./dictionaries/project-terms.txt",
      "description": "Project-specific terminology"
    },
    {
      "name": "acronyms",
      "path": "./dictionaries/acronyms.txt",
      "addWords": true
    }
  ],
  "dictionaries": ["project-terms", "acronyms"]
}
```

#### Dictionary File Formats

- **Plain text**: One word per line (`.txt`)
- **CSpell format**: Supports affixes and transformations (`.trie`, `.trie.gz`)

### 5. Shareable Config Package Structure

#### Recommended Package Structure

```
@your-org/cspell-config/
├── package.json
├── README.md
├── cspell.json              # Base config
├── typescript.json          # TypeScript-specific
├── react.json               # React-specific
├── node.json                # Node.js-specific
└── dictionaries/
    ├── company-terms.txt
    └── domain-terms.txt
```

#### Package.json Requirements

```json
{
  "name": "@your-org/cspell-config",
  "version": "1.0.0",
  "description": "Shareable CSpell configuration",
  "main": "cspell.json",
  "files": [
    "*.json",
    "dictionaries/**"
  ],
  "keywords": ["cspell", "spell-checker", "config"],
  "peerDependencies": {
    "cspell": ">=8.0.0"
  }
}
```

#### Exports for Multiple Configs

```json
{
  "exports": {
    ".": "./cspell.json",
    "./typescript": "./typescript.json",
    "./react": "./react.json",
    "./node": "./node.json"
  }
}
```

### 6. Best Practices for Shareable Configs

#### Configuration Design Principles

1. **Layered Approach**: Create a hierarchy
   - Base config: Common settings for all projects
   - Language configs: Language-specific settings
   - Framework configs: Framework-specific settings
   - Project configs: Project-specific overrides

2. **Minimize False Positives**:
   - Only include well-known, universally accepted terms
   - Document why terms are included
   - Be conservative with custom words

3. **Performance Considerations**:
   - Keep dictionary lists focused
   - Don't enable unnecessary dictionaries
   - Use appropriate `minWordLength` values
   - Set reasonable `maxNumberOfProblems` limits

4. **Maintainability**:
   - Version your configs semantically
   - Document breaking changes
   - Provide migration guides
   - Keep dictionaries organized by category

#### Common Patterns

**Base Configuration Template**:

```json
{
  "version": "0.2",
  "language": "en",
  "dictionaries": [
    "softwareTerms",
    "companies"
  ],
  "ignorePaths": [
    "node_modules/**",
    "dist/**",
    "build/**",
    "coverage/**",
    ".git/**",
    "*.min.*",
    "*.map",
    "package-lock.json",
    "yarn.lock",
    "pnpm-lock.yaml"
  ],
  "minWordLength": 3,
  "allowCompoundWords": false,
  "maxNumberOfProblems": 100
}
```

**TypeScript Extension**:

```json
{
  "version": "0.2",
  "import": ["@your-org/cspell-config"],
  "dictionaries": [
    "typescript",
    "node",
    "npm"
  ],
  "languageSettings": [
    {
      "languageId": "typescript,javascript",
      "ignoreRegExpList": [
        "/import\\s+.*from\\s+[\"'].*[\"']/g",
        "/require\\([\"'].*[\"']\\)/g"
      ]
    }
  ]
}
```

### 7. Testing Shareable Configs

#### Local Testing

1. Use `npm link` or `yarn link` to test locally
2. Create a test project with various file types
3. Run `cspell "**/*"` to verify behavior
4. Check that imports resolve correctly

#### Validation Checklist

- [ ] Config loads without errors
- [ ] Dictionaries resolve correctly
- [ ] Custom dictionaries are found
- [ ] Ignore patterns work as expected
- [ ] No unexpected false positives
- [ ] Performance is acceptable
- [ ] Works with VS Code extension
- [ ] Works with CLI tool

#### CI/CD Integration

```json
{
  "scripts": {
    "spell-check": "cspell '**/*'",
    "spell-check:verbose": "cspell '**/*' --show-suggestions"
  }
}
```

### 8. Common Pitfalls and Solutions

#### Problem: Dictionaries Not Found

**Cause**: Custom dictionary paths are relative to config file location
**Solution**: Use explicit paths or package the dictionaries with config

#### Problem: Import Not Resolving

**Cause**: Package not in node_modules or incorrect path
**Solution**: Ensure package is installed; use exact package name

#### Problem: Too Many False Positives

**Cause**: Wrong locale or missing domain dictionaries
**Solution**: Enable appropriate dictionaries; tune `minWordLength`

#### Problem: Performance Issues

**Cause**: Too many dictionaries or large word lists
**Solution**: Be selective with dictionaries; use focused configs

#### Problem: Merge Conflicts

**Cause**: Multiple configs setting same properties
**Solution**: Understand merge order; use overrides strategically

### 9. Documentation Standards

Every shareable config should include:

#### README.md Structure

```markdown
# @your-org/cspell-config

## Installation
npm install --save-dev @your-org/cspell-config

## Usage
// .cspell.json
{
  "import": ["@your-org/cspell-config"]
}

## Available Configs
- Base: @your-org/cspell-config
- TypeScript: @your-org/cspell-config/typescript
- React: @your-org/cspell-config/react

## Included Dictionaries
- List all included dictionaries
- Explain why each is included

## Custom Words
- Document any custom words added
- Provide rationale for additions

## Upgrading
- Migration guides for major versions
```

### 10. Key Commands and Workflows

#### CSpell CLI Commands

```bash
# Check files
cspell "**/*"
cspell "src/**/*.ts"

# Use specific config
cspell --config .cspell.json "**/*"

# Show suggestions
cspell --show-suggestions "**/*"

# List configuration
cspell --show-config

# Trace dictionary resolution
cspell trace word

# Check specific words
cspell check-text "tekst to chek"
```

#### Development Workflow

1. Create base configuration
2. Test with sample projects
3. Iterate on dictionary selection
4. Document decisions
5. Version and publish
6. Test in consuming projects
7. Gather feedback
8. Iterate

### 11. Integration Patterns

#### VS Code Integration

Projects using your config automatically work with the Code Spell Checker extension. Consider including `.vscode/extensions.json`:

```json
{
  "recommendations": [
    "streetsidesoftware.code-spell-checker"
  ]
}
```

#### Pre-commit Hooks

```json
{
  "husky": {
    "hooks": {
      "pre-commit": "cspell --no-progress '{README.md,{src,tests}/**/*.{ts,tsx}}'"
    }
  }
}
```

#### GitHub Actions

```yaml
- name: Spell Check
  run: npx cspell "**/*"
```

## Project-Specific Behaviors

### Always Do

- ✅ Use `version: "0.2"` in all configs
- ✅ Test configs thoroughly before publishing
- ✅ Document all custom words and dictionaries
- ✅ Use semantic versioning
- ✅ Provide clear migration guides
- ✅ Keep dictionaries focused and minimal
- ✅ Consider performance impact
- ✅ Use TypeScript types from `@cspell/cspell-types` for validation

### Never Do

- ❌ Include personal dictionary entries
- ❌ Add misspellings to word lists
- ❌ Enable all dictionaries by default
- ❌ Ignore performance considerations
- ❌ Break semantic versioning
- ❌ Publish untested configs
- ❌ Include large, unfocused word lists

### When Making Changes

1. Read the entire config file first
2. Understand the import hierarchy
3. Test changes locally with `npm link`
4. Verify no regressions in test projects
5. Update documentation
6. Follow semantic versioning for releases

## Resources

- **Official Documentation**: <https://cspell.org/docs/>
- **Configuration Reference**: <https://cspell.org/docs/Configuration/>
- **Import/Extends Guide**: <https://cspell.org/docs/Configuration/imports>
- **CSpell Types**: <https://www.npmjs.com/package/@cspell/cspell-types>
- **Dictionary Packages**: Search `@cspell/dict-*` on npm
- **VS Code Extension**: <https://marketplace.visualstudio.com/items?itemName=streetsidesoftware.code-spell-checker>

## Quick Reference

### Config Priority (Highest to Lowest)

1. Command-line arguments
2. Project config file
3. Imported configs (last to first in import array)
4. Default settings

### Most Used Properties

```json
{
  "version": "0.2",
  "import": ["base-config"],
  "language": "en",
  "dictionaries": ["typescript", "node"],
  "words": ["customterm"],
  "ignoreWords": ["ignoreme"],
  "ignorePaths": ["dist/**"],
  "minWordLength": 3
}
```

### Testing Your Config

```bash
# Show effective configuration
cspell --show-config

# Trace a word through dictionaries
cspell trace <word>

# Validate config file
cspell lint --config .cspell.json

# Check with verbose output
cspell --show-suggestions "**/*"
```
