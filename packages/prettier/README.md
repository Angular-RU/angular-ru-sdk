# Shareable Prettier config for Angular projects

[![image](https://badge.fury.io/js/%40angular-ru%2Fprettier.svg)](https://badge.fury.io/js/%40angular-ru%2Fprettier)
[![image](https://img.shields.io/npm/dw/@angular-ru/prettier)](https://badge.fury.io/js/%40angular-ru%2Fprettier)

### Quick start

```bash
$ npm install @angular-ru/prettier -D
```

Add to your `package.json`:

```json
{
    "name": "my-app-project",
    "version": "9000.0.1",
    "prettier": "@angular-ru/prettier"
}
```

or `.prettierrc.js`:

```js
module.exports = {
    ...require('@angular-ru/prettier'),
    // override
    semi: false
};
```

### .editorconfig

We recommend using these settings.

```text
# Editor configuration, see https://editorconfig.org
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
