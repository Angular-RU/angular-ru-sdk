# Angular-RU eslint-plugin

An ESLint-specific plugin that contains rules which are specific to Angular projects. It can be combined with any other
ESLint plugins in the normal way.

<p>
  <a href="https://badge.fury.io/js/%40angular-ru%2Feslint-plugin">
    <img src="https://badge.fury.io/js/%40angular-ru%2Feslint-plugin.svg" />
  </a>
  <a href="https://npm-stat.com/charts.html?package=%40angular-ru%2Feslint-plugin&from=2019-09-01">
    <img src="https://img.shields.io/npm/dw/@angular-ru/eslint-plugin" />
  </a>
</p>

### Quick start

```bash
$ npm install @angular-ru/eslint-plugin -D
```

Add to your `.eslintrc.json`:

```js
{
    "plugins": ["@angular-ru/eslint-plugin"],
    "rules": {
        // by default in @angular-ru/eslint-plugin
        "@angular-ru/no-suffix-file": [
            "error",
            {
                "fileEndsWithList": [
                    ".model.ts",
                    ".models.ts",
                    ".enum.ts",
                    ".enums.ts",
                    ".type.ts",
                    ".types.ts",
                    ".interface.ts",
                    ".interfaces.ts"
                ]
            }
        ]
    }
}
```

Check out eslint:

```
$ eslint "**/*.ts"
```
