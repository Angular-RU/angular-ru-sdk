## Tooltip directive for your Angular app

## Introduction

[**Demo**](https://angular-ru.github.io/angular-ru-tooltip-example-app)

```bash
$ npm install @angular-ru/cdk/tooltip
```

- Add styles to `styles.scss` file:

```scss
@import './node_modules/@angular-ru/cdk/tooltip/styles/index';

// ...
```

```typescript
import {provideTooltip} from '@angular-ru/cdk/tooltip';

export const appConfig: ApplicationConfig = {
  providers: [provideTooltip()],
};
```

#### Basic example

```html
<div
  tooltip="Bottom"
  tooltip-placement="bottom"
>
  Bottom
</div>
<div
  tooltip="Right"
  tooltip-placement="right"
>
  Right
</div>
<div
  tooltip="Left"
  tooltip-placement="left"
>
  Left
</div>
<div
  tooltip="Top"
  tooltip-placement="top"
>
  Top
</div>
```

The value of option `'[tooltip-placement]'` by default is `'top'`.

#### A custom template for the tooltip (html)

```html
<div
  tooltip-placement="bottom"
  [tooltip]="tooltipTemplate"
  [tooltip-context]="{ name: 'Max' }"
>
  Bottom with HTML
</div>

<ng-template
  #tooltipTemplate
  let-context
>
  <span style="text-decoration: underline; color: yellow">Hello {{ context.name }}</span>
</ng-template>
```
