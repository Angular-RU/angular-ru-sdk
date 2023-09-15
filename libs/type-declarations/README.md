# Additional utility type declarations to improve development experience

[![image](https://badge.fury.io/js/%40angular-ru%2Ftype-declarations.svg)](https://badge.fury.io/js/%40angular-ru%2Ftype-declarations)
[![image](https://img.shields.io/npm/dw/@angular-ru/type-declarations)](https://badge.fury.io/js/%40angular-ru%2Ftype-declarations)

### Install

```bash
$ npm install @angular-ru/type-declarations -D
```

Edit file `tsconfig.json` in the root of your project or in the subproject where you want to add these types to.

```json5
{
    extends: './tsconfig.base.json',
    compilerOptions: {
        types: ['../@angular-ru/type-declarations']
    }
}
```

Or just inherit your base `tsconfig` from our `@angular-ru/typescript` (don't forget to read notes below).

**Note**: the package path is relative to `node_modules` unless `typeRoots` is specified in your `tsconfig`. If
specified, the path will be resolved relative to the values of this parameter.

**Note**: if you inherit `tsconfig` and specify the `types` field, it will be completely overwritten, so you will need
to additionally re-specify this package in the array.

For example, you inherited tsconfig to make configuration for jest. You need to specify jest in the types array. In this
case, our package will not be taken into account. You need to specify it again:

`tsconfig.spec.json`:

```json5
{
    extends: './tsconfig.json',
    compilerOptions: {
        types: ['jest', '../@angular-ru/type-declarations']
    }
}
```
