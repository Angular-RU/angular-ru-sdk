# Shareable commitlint config for Angular projects

[![image](https://badge.fury.io/js/%40angular-ru%2Fcommitlint.svg)](https://badge.fury.io/js/%40angular-ru%2Fcommitlint)
[![image](https://img.shields.io/npm/dw/@angular-ru/commitlint)](https://badge.fury.io/js/%40angular-ru%2Fcommitlint)

### Quick start

```bash
$ npm install @angular-ru/commitlint -D
```

Edit file `package.json` in the root of your project:

```json5
{
    // ...
    scripts: {
        // ...
    },
    // Add 'commitlint' section
    commitlint: {
        extends: ['@angular-ru/commitlint']
    }
}
```
