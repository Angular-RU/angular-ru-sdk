#### `@angular-ru/cdk/animations`

-   `fadeInLinearAnimation`

```ts
import { fadeInLinearAnimation } from '@angular-ru/cdk/animations';
import { Component } from '@angular-ru/core';

@Component({
    //...
    template: `<div *ngIf="showed" [@fadeInLinear]></div>`,
    animation: [fadeInLinearAnimation]
})
export class AppComponent {
    public showed: boolean = true;
}
```

-   `fadeInBezierAnimation`

```ts
import { fadeInBezierAnimation } from '@angular-ru/cdk/animations';
import { Component } from '@angular-ru/core';

@Component({
    //...
    template: `<div *ngFor="let i of [1, 2, 3]" [@fadeInBezier]>{{ i }}</div>`,
    animation: [fadeInBezierAnimation]
})
export class AppComponent {}
```
