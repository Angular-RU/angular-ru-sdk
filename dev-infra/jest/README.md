# Automatic create Jest config for Angular projects

[![image](https://badge.fury.io/js/%40angular-ru%2Fjest.svg)](https://badge.fury.io/js/%40angular-ru%2Fjest)
[![image](https://img.shields.io/npm/dw/@angular-ru/jest)](https://badge.fury.io/js/%40angular-ru%2Fjest)

It's very convenient to testing our applications with Angular and Jest now.

### Quick start

```bash
$ npm install @angular-ru/jest -D
```

Create `jest.config.js`

```ts
const { createTsJestConfig } = require('@angular-ru/jest');

module.exports = createTsJestConfig({
    tsConfig: './tsconfig.json',
    jestConfig: {
        rootDir: '.',
        displayName: 'My Angular App',
        testMatch: ['<rootDir>/tests/**/*.spec.ts'],
        collectCoverageFrom: ['<rootDir>/src/app/**/*.ts']
    }
});
```

```bash
$ jest --config jest.config.js --coverage
```

### FAQ

-   I have `jest-haste-map: Haste module naming collision`

```ts
module.exports = createTsJestConfig({
    // ...
    jestConfig: {
        // ...
        modulePathIgnorePatterns: ['<rootDir>/dist/']
    }
});
```

-   How can I add setupFilesAfterEnv files?

```ts
module.exports = createTsJestConfig({
    // ...
    jestConfig: {
        // ...
        setupFilesAfterEnv: ['<rootDir>/setup-jest.ts']
    }
});
```
