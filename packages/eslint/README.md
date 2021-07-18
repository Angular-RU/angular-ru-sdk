# Shareable Configs for Angular projects

<p>
  <a href="https://badge.fury.io/js/%40angular-ru%2Feslint-config">
    <img src="https://badge.fury.io/js/%40angular-ru%2Feslint-config.svg" />
  </a>
  <a href="https://npm-stat.com/charts.html?package=%40angular-ru%2Feslint-config&from=2019-09-01">
    <img src="https://img.shields.io/npm/dw/@angular-ru/eslint-config" />
  </a>
</p>

These rules are the most stringent, which allow you to control all types of data in your project, as well as more
strictly determine the order of imports.

### Quick start

```bash
$ npm install @angular-ru/eslint-config -D
```

Also you do not need to manually install ESLint, it will always be the newest.

Add to your `.eslintrc.json`:

```json
{
    "extends": "@angular-ru/eslint-config"
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
    extends: '@angular-ru/eslint-config',
    rules: {
        // override extended rules
    }
}
```

### Optional

### import/no-deprecated by default "off"

```json
{
    "extends": "@angular-ru/eslint-config",
    "rules": {
        "import/no-deprecated": "error"
    }
}
```
