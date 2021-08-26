# Shareable TypeScript config for Angular projects

[![image](https://badge.fury.io/js/%40angular-ru%2Ftypescript.svg)](https://badge.fury.io/js/%40angular-ru%2Ftypescript)
[![image](https://img.shields.io/npm/dw/@angular-ru/typescript)](https://badge.fury.io/js/%40angular-ru%2Ftypescript)

### Quick start

```bash
$ npm install @angular-ru/typescript -D
```

Add to your `tsconfig.json`:

```json5
{
    extends: '@angular-ru/typescript/tsconfig.json',
    angularCompilerOptions: {
        // override shared angularCompilerOptions
        strictTemplates: true,
        disableTypeScriptVersionCheck: true
    },
    compilerOptions: {
        // override shared compilerOptions
        outDir: 'dist',
        target: 'es2018',
        lib: ['es2018'],
        typeRoots: ['./node_modules/@types']
    }
}
```
