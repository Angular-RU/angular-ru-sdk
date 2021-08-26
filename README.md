## Angular-RU SDK

[![](https://github.com/angular-ru/angular-ru-sdk/workflows/Angular-RU%20SDK%20CI/badge.svg)](https://github.com/Angular-RU/angular-ru-sdk/actions?query=workflow%3A%22Angular-RU+SDK+CI%22+branch%3Amaster)

The Angular-RU Software Development Kit (SDK) is a set of tool chain that implement common interaction patterns whilst
being un opinionated about their presentation for Angular. It represents an abstraction of the core functionalities
found in the Angular.

#### Version policy

`X.Y.Z`, where `X` align with Angular version, `Y` align with features and `Z` align with bugfixes.

---

### Component libraries

| **Package**                                                                            | **Version**                                                                   | **README**                                                                                 | **Downloads**                                                                                                             |
| -------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------- |
| [@angular-ru/common](https://npmjs.com/package/@angular-ru/common)                     | ![](https://img.shields.io/npm/v/%40angular-ru%2Fcommon/latest.svg)           | [![](https://img.shields.io/badge/README--green.svg)](packages/common/README.md)           | [![](https://img.shields.io/npm/dm/@angular-ru/common)](https://npmjs.com/package/@angular-ru/common)                     |
| [@angular-ru/tooltip](https://npmjs.com/package/@angular-ru/tooltip)                   | ![](https://img.shields.io/npm/v/%40angular-ru%2Ftooltip/latest.svg)          | [![](https://img.shields.io/badge/README--green.svg)](packages/tooltip/README.md)          | [![](https://img.shields.io/npm/dm/@angular-ru/tooltip)](https://npmjs.com/package/@angular-ru/tooltip)                   |
| [@angular-ru/ng-table-builder](https://npmjs.com/package/@angular-ru/ng-table-builder) | ![](https://img.shields.io/npm/v/%40angular-ru%2Fng-table-builder/latest.svg) | [![](https://img.shields.io/badge/README--green.svg)](packages/ng-table-builder/README.md) | [![](https://img.shields.io/npm/dm/@angular-ru/ng-table-builder)](https://npmjs.com/package/@angular-ru/ng-table-builder) |
| [@angular-ru/stream](https://npmjs.com/package/@angular-ru/stream)                     | ![](https://img.shields.io/npm/v/%40angular-ru%2Fstream/latest.svg)           | [![](https://img.shields.io/badge/README--green.svg)](packages/stream/README.md)           | [![](https://img.shields.io/npm/dm/@angular-ru/stream)](https://npmjs.com/package/@angular-ru/stream)                     |

---

### Development infrastructure

#### Sharable configs

| **Package**                                                                | **Version**                                                             | **README**                                                                            | **Downloads**                                                                                                 |
| -------------------------------------------------------------------------- | ----------------------------------------------------------------------- | ------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------- |
| [@angular-ru/typescript](https://npmjs.com/package/@angular-ru/typescript) | ![](https://img.shields.io/npm/v/%40angular-ru%2Ftypescript/latest.svg) | [![](https://img.shields.io/badge/README--green.svg)](dev-infra/typescript/README.md) | [![](https://img.shields.io/npm/dm/@angular-ru/typescript)](https://npmjs.com/package/@angular-ru/typescript) |
| [@angular-ru/renovate](https://npmjs.com/package/@angular-ru/renovate)     | ![](https://img.shields.io/npm/v/%40angular-ru%2Frenovate/latest.svg)   | [![](https://img.shields.io/badge/README--green.svg)](dev-infra/renovate/README.md)   | [![](https://img.shields.io/npm/dm/@angular-ru/renovate)](https://npmjs.com/package/@angular-ru/renovate)     |
| [@angular-ru/prettier](https://npmjs.com/package/@angular-ru/prettier)     | ![](https://img.shields.io/npm/v/%40angular-ru%2Fprettier/latest.svg)   | [![](https://img.shields.io/badge/README--green.svg)](dev-infra/prettier/README.md)   | [![](https://img.shields.io/npm/dm/@angular-ru/prettier)](https://npmjs.com/package/@angular-ru/prettier)     |
| [@angular-ru/commitlint](https://npmjs.com/package/@angular-ru/commitlint) | ![](https://img.shields.io/npm/v/%40angular-ru%2Fcommitlint/latest.svg) | [![](https://img.shields.io/badge/README--green.svg)](dev-infra/commitlint/README.md) | [![](https://img.shields.io/npm/dm/@angular-ru/commitlint)](https://npmjs.com/package/@angular-ru/commitlint) |

#### Jest

| **Package**                                                    | **Version**                                                       | **README**                                                                      | **Downloads**                                                                                     |
| -------------------------------------------------------------- | ----------------------------------------------------------------- | ------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------- |
| [@angular-ru/jest](https://npmjs.com/package/@angular-ru/jest) | ![](https://img.shields.io/npm/v/%40angular-ru%2Fjest/latest.svg) | [![](https://img.shields.io/badge/README--green.svg)](dev-infra/jest/README.md) | [![](https://img.shields.io/npm/dm/@angular-ru/jest)](https://npmjs.com/package/@angular-ru/jest) |

#### ESLint

| **Package**                                                                                            | **Version**                                                                           | **README**                                                                                          | **Downloads**                                                                                                                             |
| ------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| [@angular-ru/eslint-plugin-enterprise](https://npmjs.com/package/@angular-ru/eslint-plugin-enterprise) | ![](https://img.shields.io/npm/v/%40angular-ru%2Feslint-plugin-enterprise/latest.svg) | [![](https://img.shields.io/badge/README--green.svg)](dev-infra/eslint-plugin-enterprise/README.md) | [![](https://img.shields.io/npm/dm/@angular-ru/eslint-plugin-enterprise)](https://npmjs.com/package/@angular-ru/eslint-plugin-enterprise) |
| [@angular-ru/eslint-config-enterprise](https://npmjs.com/package/@angular-ru/eslint-config-enterprise) | ![](https://img.shields.io/npm/v/%40angular-ru%2Feslint-config-enterprise/latest.svg) | [![](https://img.shields.io/badge/README--green.svg)](dev-infra/eslint-config-enterprise/README.md) | [![](https://img.shields.io/npm/dm/@angular-ru/eslint-config-enterprise)](https://npmjs.com/package/@angular-ru/eslint-config-enterprise) |

#### Useful dev dependencies for many project

| **Package**                                                                            | **Version**                                                                   | **README**                                                                                  | **Downloads**                                                                                                             |
| -------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------- |
| [@angular-ru/dev-dependencies](https://npmjs.com/package/@angular-ru/dev-dependencies) | ![](https://img.shields.io/npm/v/%40angular-ru%2Fdev-dependencies/latest.svg) | [![](https://img.shields.io/badge/README--green.svg)](dev-infra/dev-dependencies/README.md) | [![](https://img.shields.io/npm/dm/@angular-ru/dev-dependencies)](https://npmjs.com/package/@angular-ru/dev-dependencies) |
