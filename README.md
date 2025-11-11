# @gfmio/config-cspell

Shareable [CSpell](https://cspell.org/) configurations for consistent spell-checking across projects.

## Features

- **Layered Configuration**: Start with a base config and extend for specific tech stacks
- **Multiple Presets**: TypeScript, Node.js, React, and Markdown configurations
- **Custom Dictionaries**: Common technology terms and acronyms included
- **Optimized Patterns**: Smart ignore patterns for URLs, hashes, emails, and more
- **Zero Configuration**: Works out of the box with sensible defaults

## Installation

```bash
npm install --save-dev @gfmio/config-cspell cspell
```

## Usage

### Base Configuration

For general projects, extend the base configuration:

**`.cspell.json`**:

```json
{
  "import": ["@gfmio/config-cspell"]
}
```

### TypeScript/JavaScript Projects

For TypeScript or JavaScript projects:

**`.cspell.json`**:

```json
{
  "import": ["@gfmio/config-cspell/typescript"]
}
```

### Node.js Projects

For Node.js backend projects:

**`.cspell.json`**:

```json
{
  "import": ["@gfmio/config-cspell/node"]
}
```

### React Projects

For React applications:

**`.cspell.json`**:

```json
{
  "import": ["@gfmio/config-cspell/react"]
}
```

### Markdown/Documentation

For documentation-heavy projects:

**`.cspell.json`**:

```json
{
  "import": ["@gfmio/config-cspell/markdown"]
}
```

### Combining Configurations

You can combine multiple configurations by importing them in order:

```json
{
  "import": [
    "@gfmio/config-cspell/react",
    "@gfmio/config-cspell/markdown"
  ]
}
```

### Adding Project-Specific Words

Extend with your own project-specific terms:

```json
{
  "import": ["@gfmio/config-cspell/typescript"],
  "words": [
    "mycompany",
    "projectname",
    "customterm"
  ]
}
```

## Available Configurations

### Base (`@gfmio/config-cspell`)

The foundation configuration that all others extend.

**Includes:**

- Common software terms dictionary
- Company names dictionary
- Custom technology terms
- Common acronyms
- Smart ignore patterns (node_modules, build artifacts, lock files, etc.)
- Regex patterns to ignore (hashes, URLs, emails)

**Settings:**

- Minimum word length: 3
- Maximum problems per file: 100
- Compound words: disabled

### TypeScript (`@gfmio/config-cspell/typescript`)

Extends base config with TypeScript/JavaScript support.

**Includes:**

- TypeScript dictionary
- Node.js dictionary
- npm dictionary
- Import/export statement ignoring
- Test file configurations (Jest, Vitest, Mocha)

**Optimized for:**

- `.ts`, `.tsx`, `.js`, `.jsx`, `.mts`, `.cts`, `.mjs`, `.cjs`
- Type definition files (`.d.ts`)
- Test files (`*.test.*`, `*.spec.*`, `__tests__/`, `test/`)

### Node.js (`@gfmio/config-cspell/node`)

Extends TypeScript config with Node.js-specific terms.

**Includes:**

- All TypeScript features
- Node.js built-in terms (`dirname`, `filename`, `argv`, etc.)
- Bash dictionary
- Docker dictionary (for Dockerfiles)

**Special handling:**

- Environment files (`.env*`) are disabled
- Dockerfile support

### React (`@gfmio/config-cspell/react`)

Extends TypeScript config with React support.

**Includes:**

- All TypeScript features
- HTML dictionary
- CSS dictionary
- Font names dictionary
- React hooks and common terms
- JSX/TSX support

**Optimized for:**

- React components (`.tsx`, `.jsx`)
- CSS/SCSS files
- CSS Modules

### Markdown (`@gfmio/config-cspell/markdown`)

Extends base config for documentation.

**Includes:**

- English dictionaries (en, en-US)
- Code block ignoring
- Inline code ignoring
- Link and image syntax ignoring
- HTML tag ignoring

**Special handling:**

- README.md: Additional package manager terms
- CHANGELOG.md: Version number and heading ignoring
- CONTRIBUTING.md: Repository-related terms

## Custom Dictionaries

This package includes two custom dictionaries:

### Common Technology Terms

Located at `dictionaries/common-tech-terms.txt`, includes:

- Version control terms (repos, gitignore, unstage)
- DevOps tools (kubernetes, terraform, ansible)
- Build tools (webpack, vite, esbuild)
- Testing terms (testable, unmock)
- Web technologies (frontend, backend, websocket)
- Databases (postgres, mongodb, redis)
- Common abbreviations (config, auth, utils)

### Common Acronyms

Located at `dictionaries/common-acronyms.txt`, includes:

- APIs, CLI, SDK, CDN, DNS
- HTTP, HTTPS, SSL, TLS, TCP, UDP
- JSON, XML, HTML, CSS, SVG
- REST, CRUD, CORS, JWT, OAuth
- MVC, SPA, SSR, SSG
- TDD, BDD, E2E
- And many more

## Configuration Hierarchy

```
cspell.json (base)
├── typescript.json
│   ├── node.json
│   └── react.json
└── markdown.json
```

## Ignored Paths

All configurations ignore common build artifacts and dependencies:

- `node_modules/`
- `dist/`, `build/`, `out/`
- `coverage/`
- `.git/`, `.vscode/`, `.idea/`
- Minified files (`*.min.*`)
- Source maps (`*.map`)
- Lock files (package-lock.json, yarn.lock, pnpm-lock.yaml)
- Framework-specific (`.next/`, `.nuxt/`, `.cache/`)

## Ignored Patterns

Regex patterns automatically ignored:

- Git commit hashes (7-40 hex characters)
- Long uppercase identifiers (20+ characters)
- URLs (http/https)
- Email addresses

## Common Misspellings Flagged

These common typos are always flagged as errors:

- hte → the
- teh → the
- recieve → receive
- seperate → separate

## VS Code Integration

This configuration works automatically with the [Code Spell Checker extension](https://marketplace.visualstudio.com/items?itemName=streetsidesoftware.code-spell-checker).

Add to your `.vscode/extensions.json`:

```json
{
  "recommendations": [
    "streetsidesoftware.code-spell-checker"
  ]
}
```

## CLI Usage

Check spelling across your project:

```bash
# Check all files
npx cspell "**/*"

# Check specific files
npx cspell "src/**/*.ts"

# Show suggestions
npx cspell --show-suggestions "**/*"

# Trace a word through dictionaries
npx cspell trace <word>

# Show effective configuration
npx cspell --show-config
```

## CI/CD Integration

### GitHub Actions

```yaml
name: Spell Check

on: [push, pull_request]

jobs:
  spellcheck:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
      - run: npm ci
      - run: npx cspell "**/*"
```

### Pre-commit Hook

Using [Husky](https://typicode.github.io/husky/):

```json
{
  "husky": {
    "hooks": {
      "pre-commit": "npx cspell --no-progress '{src,tests}/**/*.{ts,tsx}'"
    }
  }
}
```

## Customization

### Override Settings

```json
{
  "import": ["@gfmio/config-cspell/typescript"],
  "minWordLength": 4,
  "maxNumberOfProblems": 200,
  "allowCompoundWords": true
}
```

### Add Custom Dictionaries

```json
{
  "import": ["@gfmio/config-cspell/typescript"],
  "dictionaryDefinitions": [
    {
      "name": "project-terms",
      "path": "./dictionaries/project-terms.txt"
    }
  ],
  "dictionaries": ["project-terms"]
}
```

### Disable Built-in Dictionaries

```json
{
  "import": ["@gfmio/config-cspell/react"],
  "dictionaries": ["!html"]
}
```

### Add Language-Specific Settings

```json
{
  "import": ["@gfmio/config-cspell/typescript"],
  "languageSettings": [
    {
      "languageId": "python",
      "dictionaries": ["python"]
    }
  ]
}
```

## Troubleshooting

### Config Not Loading

Ensure the package is installed in your `node_modules`:

```bash
npm install --save-dev @gfmio/config-cspell
```

### Too Many False Positives

1. Verify you're using the right configuration for your project type
2. Add project-specific terms to the `words` array
3. Adjust `minWordLength` if needed
4. Use `ignoreWords` for terms you want to ignore

### Custom Dictionary Not Found

Custom dictionaries are relative to the config file. Use explicit paths:

```json
{
  "dictionaryDefinitions": [
    {
      "name": "my-dict",
      "path": "./path/to/dictionary.txt"
    }
  ]
}
```

### Performance Issues

1. Limit the number of enabled dictionaries
2. Increase `minWordLength`
3. Add more specific ignore patterns
4. Use `maxNumberOfProblems` to cap issues per file

## Contributing

Contributions are welcome! Please feel free to submit issues or pull requests.

### Adding Terms

When adding terms to custom dictionaries:

- Only add well-known, universally accepted terms
- Document why the term is needed
- Keep terms organized by category
- Use lowercase for case-insensitive terms

## License

MIT

## Links

- [CSpell Documentation](https://cspell.org/)
- [CSpell Configuration Reference](https://cspell.org/configuration/)
- [VS Code Extension](https://marketplace.visualstudio.com/items?itemName=streetsidesoftware.code-spell-checker)
- [GitHub Repository](https://github.com/gfmio/config-cspell)

## Version History

### 1.0.0

- Initial release
- Base configuration
- TypeScript/JavaScript support
- Node.js support
- React support
- Markdown support
- Custom dictionaries for tech terms and acronyms
