# Angular-RU eslint-plugin

An ESLint-specific plugin that contains rules which are specific to Angular projects. It can be combined with any other
ESLint plugins in the normal way.

[![image](https://badge.fury.io/js/%40angular-ru%2Feslint-plugin-enterprise.svg)](https://badge.fury.io/js/%40angular-ru%2Feslint-plugin-enterprise)
[![image](https://img.shields.io/npm/dw/@angular-ru/eslint-plugin-enterprise)](https://badge.fury.io/js/%40angular-ru%2Feslint-plugin-enterprise)

### Quick start

```bash
$ npm install @angular-ru/eslint-plugin-enterprise -D
```

Add to your `.eslintrc.json`:

```json
{
    "plugins": ["@angular-ru/eslint-plugin-enterprise"],
    "rules": {
        "@angular-ru/enterprise/no-suffix-file": [
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
