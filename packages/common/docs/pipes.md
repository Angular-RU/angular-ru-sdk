#### `@angular-ru/common/pipes`

-   `MutableTypeModule, MutableTypePipe`

```ts
import { MutableTypeModule } from '@angular-ru/common/pipes';
import { Component, NgModule } from '@angular/core';
import { Immutable } from '@angular-ru/typings';
import { Data } from './data';

@NgModule({
    // ..
    imports: [MutableTypeModule]
})
export class AppModule {}

@Component({
    //...
    template: `<data [list]="data | mutable"></data>`
})
export class AppComponent {
    public data: Immutable<Data[]> = [];
}
```
