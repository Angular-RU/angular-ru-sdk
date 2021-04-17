# Angular-RU eslint-plugin-file-pattern

<p>
  <a href="https://badge.fury.io/js/%40angular-ru%2Feslint-plugin-file-pattern">
    <img src="https://badge.fury.io/js/%40angular-ru%2Feslint-plugin-file-pattern.svg" />
  </a>
  <a href="https://npm-stat.com/charts.html?package=%40angular-ru%2Feslint-plugin-file-pattern&from=2019-09-01">
    <img src="https://img.shields.io/npm/dw/@angular-ru/eslint-plugin-file-pattern" />
  </a>
</p>

### Quick start

```bash
$ npm install @angular-ru/eslint-plugin-file-pattern -D
```

Add to your `.eslintrc.json`:

```json
{
    "plugins": ["@angular-ru/eslint-plugin-file-pattern"],
    "rules": {
        "@angular-ru/file-pattern/no-model-suffix": "error",
        "@angular-ru/file-pattern/no-enum-suffix": "error"
    }
}
```

Check out eslint:

```
$ eslint "**/*.ts"
```
