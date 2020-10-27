## Tooltip directive for your Angular app

## Introduction

```bash
$ npm install @angular-ru/tooltip
```

-   Add styles to `styles.scss` file:

```scss
@import '~@angular-ru/tooltip/styles';

// ...
```

```ts
import { TooltipModule } from '@angular-ru/tooltip';
import { NgModule } from '@angular/core';

@NgModule({
    imports: [
        // ...
        TooltipModule
    ]
})
export class AppModule {}
```
