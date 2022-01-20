# Shareable Configs for Angular projects

[![image](https://badge.fury.io/js/%40angular-ru%2Feslint-config-enterprise.svg)](https://badge.fury.io/js/%40angular-ru%2Feslint-config-enterprise)
[![image](https://img.shields.io/npm/dw/@angular-ru/eslint-config-enterprise)](https://badge.fury.io/js/%40angular-ru%2Feslint-config-enterprise)

These rules are the most stringent, which allow you to control all types of data in your project, as well as more
strictly determine the order of imports.

### Quick start

```bash
$ npm install @angular-ru/eslint-config-enterprise -D
```

Also you do not need to manually install ESLint, it will always be the newest.

Add to your `.eslintrc.json`:

```json
{
    "extends": "@angular-ru/eslint-config-enterprise"
}
```

Check out eslint:

```
$ eslint "**/*.ts"
```

### Override rules

`.eslintrc.json` or `.eslintrc.js`:

```json5
{
    extends: '@angular-ru/eslint-config-enterprise',
    rules: {
        // override extended rules
    }
}
```

### Spellchecker

You can add your own words that will be skipped during the spellcheck.

Create `.spellcheckerrc.json` or `.spellcheckerrc.js`:

```json
{
    "skipWords": ["these", "words", "will", "be", "skipped"]
}
```

### Optional

### import/no-deprecated by default "off"

```json
{
    "extends": "@angular-ru/eslint-config-enterprise",
    "rules": {
        "import/no-deprecated": "error"
    }
}
```
