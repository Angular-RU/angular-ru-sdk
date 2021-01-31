## Tooltip directive for your Angular app

[![npm version](https://badge.fury.io/js/%40angular-ru%2Ftooltip.svg)](https://badge.fury.io/js/%40angular-ru%2Ftooltip)
[![npm-stat](https://img.shields.io/npm/dt/@angular-ru/tooltip.svg)](https://npm-stat.com/charts.html?package=@angular-ru/tooltip&from=2017-01-12)

## Introduction

Demo: https://angular-ru.github.io/angular-ru-tooltip-example-app/

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
        TooltipModule.forRoot()
    ]
})
export class AppModule {}
```

#### Basic example

```html
<div tooltip="Bottom" tooltip-placement="bottom">Bottom</div>
<div tooltip="Right" tooltip-placement="right">Right</div>
<div tooltip="Left" tooltip-placement="left">Left</div>
<div tooltip="Top" tooltip-placement="top">Top</div>
```

`The option 'tooltip-placement' is true by default`

#### A custom template for the tooltip (html)

```html
<div [tooltip]="tooltipTemplate" [tooltip-context]="{ name: 'Max' }" tooltip-placement="bottom">Bottom with HTML</div>

<ng-template #tooltipTemplate let-context>
    <span style="text-decoration: underline; color: yellow">Hello {{ context.name }}</span>
</ng-template>
```
