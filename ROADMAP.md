# ROADMAP

### Q1 Jan - Mar

`Features or fixes`

-   [x] Support Angular 10/11

### Q2 Apr - Jun

`Features or fixes`

-   [ ] Support `Jest@27, ts-jest@27, jest-preset-angular@9`
-   [ ] Support `Angular 12`

`BREAKING CHANGES`

-   [ ] Rename packages for align version with Angular:
    -   `@angular-ru/common` -> move to`@angular-ru/cdk`
        -   `@angular-ru/http` -> move to `@angular-ru/cdk/http`
        -   `@angular-ru/logger` -> move to `@angular-ru/cdk/logger`
        -   `@angular-ru/flex-layout` -> move to `@angular-ru/cdk/flex-layout`
        -   `@angular-ru/stream` -> move to `@angular-ru/cdk/stream`
        -   `@angular-ru/webscoket` -> move to `@angular-ru/cdk/websocket`
        -   `@angular-ru/ng-excel-builder` -> move to `@angular-ru/cdk/excel`
    -   Create common package to enterprise configs package
        -   `@angular-ru/tsconfig` -> move to `@angular-ru/configs/tsconfig.json`
        -   `@angular-ru/eslint-config` -> move to `@angular-ru/configs/eslint`
        -   `@angular-ru/renovate-config` -> move to `@angular-ru/configs/renovate`
        -   `@angular-ru/commitlint-config` -> move to `@angular-ru/configs/commitlint`
        -   `@angular-ru/prettier-config` -> move to `@angular-ru/configs/prettier`
    -   `@angular-ru/eslint-plugin` -> move to `@angular-ru/eslint-plugin-enterprise`
    -   `@angular-ru/jest-utils` -> move to `@angular-ru/jest-builder`
    -   `@angular-ru/ng-table-builder` -> move to `@angular-ru/table-grid`
    -   `@angular-ru/build-tools` -> move to `@angular-ru/devkit-dependencies`

### Q3 Jul - Sep

`CI`

-   [ ] Add integration with Nx Platform
-   [ ] Remove ng-packagr builder, prefer `@angular-devkit/build-angular` -
        https://github.com/Angular-RU/angular-ru-sdk/issues/628
-   [ ] Improved CI: should be checked is included package name in commit message

`Documentation`

-   [ ] Improved documentation with Docusaurus

`Features or fixes`

-   [ ] Improved HTTP statuses - https://github.com/Angular-RU/angular-ru-sdk/issues/466
-   [ ] Create new package `@angular-ru/ngxs-data-plugin`
-   [ ] Create new package `@angular-ru/cdk/material-extensions` -
        https://github.com/Angular-RU/angular-ru-sdk/issues/516
-   [ ] Improved eslint rules
    -   Add `eslint-plugin-unicorn` - https://github.com/Angular-RU/angular-ru-sdk/issues/13
    -   Add `@angular-eslint/sort-ngmodule-metadata-arrays` - https://github.com/Angular-RU/angular-ru-sdk/issues/523
    -   Add `eslint-plugin-rxjs` - https://github.com/Angular-RU/angular-ru-sdk/issues/370
    -   Add `prefer-template` - https://github.com/Angular-RU/angular-ru-sdk/issues/63

### Q4 Oct - Dec

Coming soon
