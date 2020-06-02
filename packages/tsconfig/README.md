# Shareable TypeScript config for Angular projects

<p>
  <a href="https://badge.fury.io/js/%40angular-ru%2Ftsconfig">
    <img src="https://badge.fury.io/js/%40angular-ru%2Ftsconfig.svg" />
  </a>
  <a href="https://npm-stat.com/charts.html?package=%40angular-ru%2Ftsconfig&from=2019-09-01">
    <img src="https://img.shields.io/npm/dw/@angular-ru/tsconfig" />
  </a>
</p>

### Quick start

```bash
$ npm install @angular-ru/tsconfig -D
```

Add to your `tsconfig.json`:

```json5
{
    extends: '@angular-ru/tsconfig',
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

If you want to know which properties were inherited, you can do:

```bash
$ tsc --showConfig --project tsconfig.json
```

### FAQ

-   Uncaught ReferenceError: `__importDefault is not defined` in my Angular 8 project

In the eighth version, this is not fixed, so you need to add such a line:

`polyfils.ts`

```ts
(window as any)['__importDefault'] =
    (this && (this as any).__importDefault) ||
    function (mod: any): any {
        return mod && mod.__esModule ? mod : { default: mod };
    };
```

If you use Angular 9, this does not need to be done

```
// fixed since
"@angular-devkit/build-angular": "~0.900.0"
```
