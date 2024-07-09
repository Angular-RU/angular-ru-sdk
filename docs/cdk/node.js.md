#### `@angular-ru/cdk/nodejs`

- `exposeTsCompilerOptionsByTsConfig`

tsconfig.json

```json
{
  "compilerOptions": {
    "baseUrl": "./",
    "module": "esnext",
    "target": "es2015",
    "paths": {
      "@angular-ru/cdk/*": ["./dist/library/*"]
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

```typescript
exposeTsCompilerOptionsByTsConfig('./tsconfig.spec.json');

/*

{
    compilerOptions: {
        baseUrl: './',
        module: 'commonjs', // from current
        target: 'es2015',
        paths: {
            // extended from parent
            '@angular-ru/cdk/*': ['./dist/library/*']
        }
    }
}

 */
```

- resolveTsConfigPath

when our dir `/home/user/app/name`

```typescript
resolveTsConfigPath('../tsconfig.lib.json'); // /home/user/app/tsconfig.lib.json
```

- checkIsNodeEnvironment

```typescript
checkIsNodeEnvironment(); // true or throw error
```
