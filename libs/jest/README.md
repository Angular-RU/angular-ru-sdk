# Automatic create Jest config for Angular projects

[![image](https://badge.fury.io/js/%40angular-ru%2Fjest.svg)](https://badge.fury.io/js/%40angular-ru%2Fjest)
[![image](https://img.shields.io/npm/dw/@angular-ru/jest)](https://badge.fury.io/js/%40angular-ru%2Fjest)

It's very convenient to testing our applications with Angular and Jest now.

### Quick start

```bash
$ npm install @angular-ru/jest -D
```

Create `jest.config.js`

```typescript
const { createTsJestConfig } = require('@angular-ru/jest');

module.exports = createTsJestConfig({
    tsConfig: '<rootDir>/tsconfig.spec.json',
    jestConfig: {
        rootDir: __dirname, // or another path
        testMatch: ['<rootDir>/tests/**/*.spec.ts'],
        coverageDirectory: '<rootDir>/coverage/my-app',
        setupFilesAfterEnv: ['<rootDir>/tests/setup-jest.ts'],
        modulePathIgnorePatterns: ['<rootDir>/dist/@my-scope'],
        cacheDirectory: '<rootDir>/node_modules/.cache/jest',
        collectCoverageFrom: ['<rootDir>/**/*.ts', '!<rootDir>/**/*.spec.ts']
    }
});
```

```bash
$ jest --config jest.config.js
```

### FAQ

-   I have `jest-haste-map: Haste module naming collision`

```typescript
module.exports = createTsJestConfig({
    // ...
    jestConfig: {
        // ...
        modulePathIgnorePatterns: ['<rootDir>/dist/']
    }
});
```

-   How can I add setupFilesAfterEnv files?

```typescript
module.exports = createTsJestConfig({
    // ...
    jestConfig: {
        // ...
        setupFilesAfterEnv: ['<rootDir>/setup-jest.ts']
    }
});
```
