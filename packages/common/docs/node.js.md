#### `@angular-ru/common/nodejs`

-   `exposeTsCompilerOptionsByTsConfig`

tsconfig.json

```json
{
    "compilerOptions": {
        "baseUrl": "./",
        "module": "esnext",
        "target": "es2015",
        "paths": {
            "@angular-ru/common/*": ["./dist/library/*"]
        }
    }
}
```

tsconfig.spec.json

```json
{
    "extends": "./tsconfig.json",
    "compilerOptions": {
        "module": "commonjs"
    }
}
```

```ts
exposeTsCompilerOptionsByTsConfig('./tsconfig.spec.json');

/*

{
    compilerOptions: {
        baseUrl: './',
        module: 'commonjs', // from current
        target: 'es2015',
        paths: {
            // extended from parent
            '@angular-ru/common/*': ['./dist/library/*']
        }
    }
}

 */
```

-   resolveTsConfigPath

when our dir `/home/user/app/name`

```ts
resolveTsConfigPath('../tsconfig.lib.json'); // /home/user/app/tsconfig.lib.json
```

-   checkIsNodeEnvironment

```ts
checkIsNodeEnvironment(); // true or throw error
```
