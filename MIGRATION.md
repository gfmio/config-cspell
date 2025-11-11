# Migration Guide

This guide helps you migrate between major versions of `@gfmio/config-cspell`.

## Version 1.0.0 (Initial Release)

### Breaking Changes

None - this is the initial release.

### New Features

- 27 configuration files covering all major languages and frameworks
- 6 custom dictionaries with 500+ terms
- Advanced ignore patterns (UUIDs, Base64, timestamps, semver)
- Personal names opt-in configuration
- Validation and reporting scripts

### Migration from Manual Config

If you previously maintained your own CSpell config, here's how to migrate:

#### Before

```json
{
  "version": "0.2",
  "language": "en",
  "words": ["mycompany", "projectname"],
  "ignorePaths": ["node_modules/**", "dist/**"],
  "dictionaries": ["typescript", "node"]
}
```

#### After

```json
{
  "import": ["@gfmio/config-cspell/typescript"],
  "words": ["mycompany", "projectname"]
}
```

The base config now includes:

- All common ignore paths
- Enhanced regex patterns
- Custom dictionaries for tech terms, cloud providers, frameworks, databases
- Proper dictionary definitions

### Personal Names Handling

**Important Change**: Personal names are now opt-in.

#### To Enable Personal Names

```json
{
  "import": [
    "@gfmio/config-cspell/typescript",
    "@gfmio/config-cspell/personal"
  ]
}
```

#### To Add Your Own Names

```json
{
  "import": ["@gfmio/config-cspell/typescript"],
  "words": ["yourname", "yourcompany"]
}
```

### Dictionary Changes

All custom dictionaries are now enabled by default in the base config:

- `common-tech-terms`
- `common-acronyms`
- `cloud-providers`
- `frameworks-libraries`
- `databases`

The `personal-names` dictionary is only enabled when you import `personal.json`.

### New Configurations Available

You can now use specialized configs:

- `web3` - Web3/blockchain projects
- `react-native` - Mobile development
- `php` - PHP projects
- `shell` - Shell scripts
- `sql` - SQL files
- `personal` - Personal names (opt-in)

## Future Versions

Migration guides for future versions will be added here.

## Need Help?

If you encounter issues during migration:

1. Check the [README](README.md) for current usage examples
2. Review the [CHANGELOG](CHANGELOG.md) for detailed changes
3. Open an issue on [GitHub](https://github.com/gfmio/config-cspell/issues)
