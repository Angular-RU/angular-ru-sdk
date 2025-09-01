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
import {FlexLayout} from '@angular-ru/cdk/flex-layout';

@Component({
  imports: [
    // ...
    FlexLayout,
  ],
})
export class AppComponent {}
```
