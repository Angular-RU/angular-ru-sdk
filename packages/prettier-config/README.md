# Shareable Prettier config for Angular projects

<p>
  <a href="https://badge.fury.io/js/%40angular-ru%2Fprettier-config">
    <img src="https://badge.fury.io/js/%40angular-ru%2Fprettier-config.svg" />
  </a>
  <a href="https://npm-stat.com/charts.html?package=%40angular-ru%2Fprettier-config&from=2019-09-01">
    <img src="https://img.shields.io/npm/dw/@angular-ru/prettier-config" />
  </a>
</p>

### Quick start

```bash
$ npm install @angular-ru/prettier-config -D
```

Add to your `package.json`:

```json
{
    "name": "my-app-project",
    "version": "9000.0.1",
    "prettier": "@angular-ru/prettier-config"
}
```

or `.prettierrc.js`:

```js
module.exports = {
    ...require('@angular-ru/prettier-config'),
    semi: false
};
```

### .editorconfig

We recommend using these settings.

```text
# Editor configuration, see http://editorconfig.org
root = true

[*]
charset = utf-8
indent_size = 4
end_of_line = lf
indent_style = space
max_line_length = 120
insert_final_newline = true
trim_trailing_whitespace = true
```
