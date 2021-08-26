# Internal dev dependencies

[![image](https://badge.fury.io/js/%40angular-ru%2Fdev-dependencies.svg)](https://badge.fury.io/js/%40angular-ru%2Fdev-dependencies)
[![image](https://img.shields.io/npm/dw/@angular-ru/dev-dependencies)](https://badge.fury.io/js/%40angular-ru%2Fdev-dependencies)

### Quick start

```bash
$ npm i @angular-ru/dev-dependencies -D
```

Example after install, you can use `husky` or another tools

```json5
{
    // ...
    scripts: {
        // ...
        // Append Husky 5 installer into 'postinstall' script
        postinstall: '<...> && husky install'
    }
}
```

See what packages will be
[installed](https://github.com/Angular-RU/angular-ru-sdk/blob/master/dev-infra/dev-dependencies/package.json)
