# @gfmio/config-cspell

Comprehensive shareable [CSpell](https://cspell.org/) configurations for consistent spell-checking across projects of all types.

## Features

- **20+ Specialized Configurations**: Language and framework-specific presets
- **Layered Architecture**: Build on base configs, extend for specific needs
- **5 Custom Dictionaries**: Cloud providers, frameworks, databases, tech terms, acronyms
- **Smart Ignore Patterns**: URLs, hashes, emails, build artifacts
- **Locale Support**: en-US and en-GB variants
- **Zero Configuration**: Sensible defaults that work out of the box

## Installation

```bash
npm install --save-dev @gfmio/config-cspell cspell
```

## Quick Start

Create a `.cspell.json` in your project root:

```json
{
  "import": ["@gfmio/config-cspell/typescript"]
}
```

That's it! CSpell will now use the TypeScript configuration with all its defaults.

## Available Configurations

### Core Configurations

#### Base (`@gfmio/config-cspell`)

Foundation configuration that all others extend.

**Includes:**

- Software terms, company names
- 5 custom dictionaries (tech terms, acronyms, cloud, frameworks, databases)
- Smart ignore patterns (node_modules, build artifacts, lock files)
- Regex patterns (hashes, URLs, emails)
- Minimum word length: 3, max problems: 100

```json
{
  "import": ["@gfmio/config-cspell"]
}
```

### JavaScript/TypeScript Ecosystem

#### TypeScript/JavaScript (`@gfmio/config-cspell/typescript`)

**Extends:** Base
**Dictionaries:** TypeScript, Node.js, npm
**Special handling:** Import/export statements, test files

```json
{
  "import": ["@gfmio/config-cspell/typescript"]
}
```

#### Node.js (`@gfmio/config-cspell/node`)

**Extends:** TypeScript
**Additional:** Node.js built-ins, Bash, Docker
**Ignores:** `.env*` files

```json
{
  "import": ["@gfmio/config-cspell/node"]
}
```

#### React (`@gfmio/config-cspell/react`)

**Extends:** TypeScript
**Dictionaries:** HTML, CSS, fonts
**Includes:** React hooks, JSX terms, CSS module support

```json
{
  "import": ["@gfmio/config-cspell/react"]
}
```

#### Next.js (`@gfmio/config-cspell/nextjs`)

**Extends:** React
**Includes:** Next.js API routes, SSR/SSG terms, app router

```json
{
  "import": ["@gfmio/config-cspell/nextjs"]
}
```

#### Vue.js (`@gfmio/config-cspell/vue`)

**Extends:** TypeScript
**Includes:** Vue 3 composition API, Nuxt, Vite, popular Vue libraries

```json
{
  "import": ["@gfmio/config-cspell/vue"]
}
```

#### Angular (`@gfmio/config-cspell/angular`)

**Extends:** TypeScript
**Includes:** Angular decorators, RxJS, NgRx, component/service patterns

```json
{
  "import": ["@gfmio/config-cspell/angular"]
}
```

#### Svelte (`@gfmio/config-cspell/svelte`)

**Extends:** TypeScript
**Includes:** SvelteKit, stores, lifecycle methods

```json
{
  "import": ["@gfmio/config-cspell/svelte"]
}
```

### Backend Languages

#### Python (`@gfmio/config-cspell/python`)

**Extends:** Base
**Dictionaries:** Python, Django
**Includes:** pytest, FastAPI, Flask, SQLAlchemy, common tools
**Ignores:** `__pycache__`, `.pytest_cache`, virtualenv directories

```json
{
  "import": ["@gfmio/config-cspell/python"]
}
```

#### Go (`@gfmio/config-cspell/go`)

**Extends:** Base
**Dictionaries:** Golang
**Includes:** Go tooling, popular frameworks, test utilities
**Ignores:** `vendor/`

```json
{
  "import": ["@gfmio/config-cspell/go"]
}
```

#### Rust (`@gfmio/config-cspell/rust`)

**Extends:** Base
**Dictionaries:** Rust
**Includes:** Cargo, popular crates (tokio, serde, actix)
**Ignores:** `target/`

```json
{
  "import": ["@gfmio/config-cspell/rust"]
}
```

#### Java/Kotlin (`@gfmio/config-cspell/java`)

**Extends:** Base
**Dictionaries:** Java
**Includes:** Spring Boot, Maven, Gradle, JUnit, Lombok
**Ignores:** `target/`, `build/`, `.gradle/`

```json
{
  "import": ["@gfmio/config-cspell/java"]
}
```

#### C/C++ (`@gfmio/config-cspell/cpp`)

**Extends:** Base
**Dictionaries:** C, C++
**Includes:** STL, CMake, common libraries
**Ignores:** Build artifacts

```json
{
  "import": ["@gfmio/config-cspell/cpp"]
}
```

### Styling & Markup

#### CSS/SCSS (`@gfmio/config-cspell/css`)

**Extends:** Base
**Dictionaries:** CSS, fonts
**Includes:** PostCSS, Tailwind, preprocessors

```json
{
  "import": ["@gfmio/config-cspell/css"]
}
```

#### Markdown (`@gfmio/config-cspell/markdown`)

**Extends:** Base
**Dictionaries:** English
**Ignores:** Code blocks, links, HTML
**Special handling:** README, CHANGELOG, CONTRIBUTING

```json
{
  "import": ["@gfmio/config-cspell/markdown"]
}
```

### Infrastructure & DevOps

#### Docker (`@gfmio/config-cspell/docker`)

**Extends:** Base
**Dictionaries:** Docker
**Includes:** Kubernetes, Helm, container tools
**Handles:** Dockerfiles, docker-compose, K8s manifests

```json
{
  "import": ["@gfmio/config-cspell/docker"]
}
```

### Project Types

#### Monorepo (`@gfmio/config-cspell/monorepo`)

**Extends:** TypeScript
**Includes:** Turborepo, Lerna, pnpm workspaces, changesets
**Optimized for:** Multi-package repositories

```json
{
  "import": ["@gfmio/config-cspell/monorepo"]
}
```

### Variants

#### Strict Mode (`@gfmio/config-cspell/strict`)

**Extends:** Base
**Settings:** Min word length 2, max problems 1000
**Use case:** Documentation-heavy projects, high-quality standards

```json
{
  "import": ["@gfmio/config-cspell/strict"]
}
```

#### American English (`@gfmio/config-cspell/en-us`)

**Extends:** Base
**Enforces:** US spellings (color, organize, analyze)
**Flags:** British spellings as errors

```json
{
  "import": ["@gfmio/config-cspell/en-us"]
}
```

#### British English (`@gfmio/config-cspell/en-gb`)

**Extends:** Base
**Enforces:** UK spellings (colour, organise, analyse)
**Flags:** American spellings as errors

```json
{
  "import": ["@gfmio/config-cspell/en-gb"]
}
```

## Custom Dictionaries

### Technology Terms (`dictionaries/common-tech-terms.txt`)

Version control, DevOps tools, build tools, testing, web tech, databases

### Acronyms (`dictionaries/common-acronyms.txt`)

API, CLI, HTTP, JSON, REST, MVC, SPA, TDD, and 60+ more

### Cloud Providers (`dictionaries/cloud-providers.txt`)

AWS, GCP, Azure services and generic cloud terminology

### Frameworks & Libraries (`dictionaries/frameworks-libraries.txt`)

150+ popular packages: Express, React, Vue, Django, Flask, and more

### Databases (`dictionaries/databases.txt`)

RDBMS, NoSQL, key-value stores, search engines, ORMs, message queues

## Usage Examples

### Combining Configurations

```json
{
  "import": [
    "@gfmio/config-cspell/react",
    "@gfmio/config-cspell/markdown"
  ]
}
```

### Override Settings

```json
{
  "import": ["@gfmio/config-cspell/typescript"],
  "minWordLength": 4,
  "maxNumberOfProblems": 200
}
```

### Add Project-Specific Words

```json
{
  "import": ["@gfmio/config-cspell/python"],
  "words": [
    "mycompany",
    "projectname"
  ]
}
```

### Create Custom Dictionary

```json
{
  "import": ["@gfmio/config-cspell/node"],
  "dictionaryDefinitions": [
    {
      "name": "project-terms",
      "path": "./dictionaries/project-terms.txt"
    }
  ],
  "dictionaries": ["project-terms"]
}
```

### Combine Locale with Framework

```json
{
  "import": [
    "@gfmio/config-cspell/en-gb",
    "@gfmio/config-cspell/react"
  ]
}
```

## Configuration Hierarchy

```
cspell.json (base)
├── Language/Framework Specific
│   ├── typescript.json
│   │   ├── node.json
│   │   ├── react.json
│   │   │   └── nextjs.json
│   │   ├── vue.json
│   │   ├── angular.json
│   │   ├── svelte.json
│   │   └── monorepo.json
│   ├── python.json
│   ├── go.json
│   ├── rust.json
│   ├── java.json
│   └── cpp.json
├── Styling
│   ├── css.json
│   └── markdown.json
├── Infrastructure
│   └── docker.json
└── Variants
    ├── strict.json
    ├── en-us.json
    └── en-gb.json
```

## Ignored Paths (All Configs)

- `node_modules/`, `dist/`, `build/`, `out/`
- `coverage/`, `.git/`, `.vscode/`, `.idea/`
- Minified files (`*.min.*`), source maps
- Lock files (package-lock.json, yarn.lock, pnpm-lock.yaml)
- Framework cache (`.next/`, `.nuxt/`, `.cache/`)

## Ignored Patterns (Regex)

- Git commit hashes (7-40 hex chars)
- Long uppercase identifiers (20+ chars)
- URLs (http/https)
- Email addresses

## Common Misspellings Flagged

`hte`, `teh`, `recieve`, `seperate`, and more in strict mode

## VS Code Integration

Works automatically with [Code Spell Checker extension](https://marketplace.visualstudio.com/items?itemName=streetsidesoftware.code-spell-checker).

Add to `.vscode/extensions.json`:

```json
{
  "recommendations": [
    "streetsidesoftware.code-spell-checker"
  ]
}
```

## CLI Usage

```bash
# Check all files
npx cspell "**/*"

# Check specific directory
npx cspell "src/**/*.ts"

# Show suggestions
npx cspell --show-suggestions "**/*"

# Trace word resolution
npx cspell trace <word>

# Show effective config
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

### Pre-commit Hook (Husky)

```json
{
  "husky": {
    "hooks": {
      "pre-commit": "npx cspell --no-progress '{src,tests}/**/*'"
    }
  }
}
```

## Real-World Examples

### Full-Stack TypeScript Monorepo

```json
{
  "import": [
    "@gfmio/config-cspell/monorepo",
    "@gfmio/config-cspell/nextjs",
    "@gfmio/config-cspell/docker"
  ]
}
```

### Python Data Science Project

```json
{
  "import": ["@gfmio/config-cspell/python"],
  "words": ["numpy", "pandas", "sklearn", "jupyter"]
}
```

### Go Microservice

```json
{
  "import": [
    "@gfmio/config-cspell/go",
    "@gfmio/config-cspell/docker"
  ]
}
```

### Documentation Site

```json
{
  "import": [
    "@gfmio/config-cspell/strict",
    "@gfmio/config-cspell/markdown",
    "@gfmio/config-cspell/en-us"
  ]
}
```

## Troubleshooting

### Config Not Loading

Ensure package is installed:

```bash
npm install --save-dev @gfmio/config-cspell
```

### Too Many False Positives

1. Use the right config for your tech stack
2. Add project terms to `words` array
3. Adjust `minWordLength`
4. Use `ignoreWords` for persistent false positives

### Custom Dictionary Not Found

Paths are relative to config file:

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

1. Limit enabled dictionaries
2. Increase `minWordLength`
3. Add specific ignore patterns
4. Use `maxNumberOfProblems` cap

## Contributing

Contributions welcome! Please submit issues or PRs.

### Adding Terms to Dictionaries

- Only well-known, universally accepted terms
- Document why the term is needed
- Keep organized by category
- Use lowercase for case-insensitive terms

## License

MIT

## Links

- [CSpell Documentation](https://cspell.org/)
- [Configuration Reference](https://cspell.org/configuration/)
- [VS Code Extension](https://marketplace.visualstudio.com/items?itemName=streetsidesoftware.code-spell-checker)
- [GitHub Repository](https://github.com/gfmio/config-cspell)
- [npm Package](https://www.npmjs.com/package/@gfmio/config-cspell)

## Configuration Matrix

| Config | Extends | Primary Use Case |
|--------|---------|------------------|
| `base` | - | All projects |
| `typescript` | base | TypeScript/JavaScript |
| `node` | typescript | Node.js backends |
| `react` | typescript | React apps |
| `nextjs` | react | Next.js apps |
| `vue` | typescript | Vue.js apps |
| `angular` | typescript | Angular apps |
| `svelte` | typescript | Svelte apps |
| `python` | base | Python projects |
| `go` | base | Go projects |
| `rust` | base | Rust projects |
| `java` | base | Java/Kotlin projects |
| `cpp` | base | C/C++ projects |
| `css` | base | Stylesheets |
| `markdown` | base | Documentation |
| `docker` | base | Containers/K8s |
| `monorepo` | typescript | Multi-package repos |
| `strict` | base | High standards |
| `en-us` | base | American English |
| `en-gb` | base | British English |
