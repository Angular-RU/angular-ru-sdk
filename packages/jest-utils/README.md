# Automatic create Jest config for Angular projects

<p>
  <a href="https://badge.fury.io/js/%40angular-ru%2Fjest-utils">
    <img src="https://badge.fury.io/js/%40angular-ru%2Fjest-utils.svg" />
  </a>
  <a href="https://npm-stat.com/charts.html?package=%40angular-ru%2Fjest-utils&from=2019-09-01">
    <img src="https://img.shields.io/npm/dw/@angular-ru/jest-utils" />
  </a>
</p>

It's very convenient to testing our applications with Angular and Jest now.

### Quick start

```bash
$ npm install @angular-ru/jest-utils -D
```

Create `jest.config.js`

```ts
const { createTsJestConfig } = require('@angular-ru/jest-utils');
const path = require('path');

module.exports = createTsJestConfig({
    rootDir: path.resolve('.'),
    displayName: 'My Angular App',
    testMatch: ['<rootDir>/tests/**/*.spec.ts'],
    collectCoverageFrom: ['<rootDir>/src/app/**/*.ts'],
    tsConfigRootPath: path.resolve('./tsconfig.json')
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
    modulePathIgnorePatterns: ['<rootDir>/dist/']
});
```

-   How can I define other properties that do not exist in `createTsJestConfig`?

```ts
// jest.config.js
module.exports = {
    ...createTsJestConfig({
        // ...
    }),
    watch: true
};
```

-   How can I add setupFilesAfterEnv files?

```ts
module.exports = createTsJestConfig({
    // ...
    setupFilesAfterEnv: ['<rootDir>/setupJest.ts']
});
```
