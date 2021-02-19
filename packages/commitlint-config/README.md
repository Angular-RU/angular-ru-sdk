# Shareable commitlint config for Angular projects

<p>
  <a href="https://badge.fury.io/js/%40angular-ru%2Fcommitlint-config">
    <img src="https://badge.fury.io/js/%40angular-ru%2Fcommitlint-config.svg" />
  </a>
  <a href="https://npm-stat.com/charts.html?package=%40angular-ru%2Fcommitlint-config&from=2019-09-01">
    <img src="https://img.shields.io/npm/dw/@angular-ru/commitlint-config" />
  </a>
</p>

### Quick start

```bash
$ npm install @angular-ru/commitlint-config -D
```

Edit file `package.json` in the root of your project:

```json5
{
    // ...
    scripts: {
        // ...
        // Append Husky 5 installer into 'postinstall' script
        postinstall: '<...> && husky install'
    },
    // Add 'commitlint' section
    commitlint: {
        extends: ['@angular-ru/commitlint-config']
    }
}
```
