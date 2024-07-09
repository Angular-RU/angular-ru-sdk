# Flex Layouts

You can use our flex directives instead of writing css rules in every component.

## Introduction

```bash
$ npm install @angular-ru/cdk
```

- Add styles to `styles.scss` file:

```scss
@import './node_modules/@angular-ru/cdk/flex-layout/styles/index';

// ...
```

```typescript
import {FlexLayoutModule} from '@angular-ru/cdk/flex-layout';
import {NgModule} from '@angular/core';

@NgModule({
  imports: [
    // ...
    FlexLayoutModule,
  ],
})
export class AppModule {}
```
