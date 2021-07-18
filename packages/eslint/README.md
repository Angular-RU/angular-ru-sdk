# Shareable Configs for Angular projects

[![image](https://badge.fury.io/js/%40angular-ru%2Feslint.svg)](https://badge.fury.io/js/%40angular-ru%2Feslint)
[![image](https://img.shields.io/npm/dw/@angular-ru/eslint)](https://badge.fury.io/js/%40angular-ru%2Feslint)

These rules are the most stringent, which allow you to control all types of data in your project, as well as more
strictly determine the order of imports.

### Quick start

```bash
$ npm install @angular-ru/eslint -D
```

Also you do not need to manually install ESLint, it will always be the newest.

Add to your `.eslintrc.json`:

```json
{
    "extends": "@angular-ru/eslint"
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
    extends: '@angular-ru/eslint',
    rules: {
        // override extended rules
    }
}
```

### Optional

### import/no-deprecated by default "off"

```json
{
    "extends": "@angular-ru/eslint",
    "rules": {
        "import/no-deprecated": "error"
    }
}
```
