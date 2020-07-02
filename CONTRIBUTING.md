#### Create new package

```bash
$ lerna create @angular-ru/my-pkg
```

#### Build steps

```bash
# Pre install
$ yarn install && yarn pre:build

# Build libraries
$ yarn build:lib

# Build integration apps
$ yarn build:app

# Run unit tests
$ yarn test
```

#### Build single library

```bash
$ yarn build:lib --scope=@angular-ru/ng-table-builder
```
