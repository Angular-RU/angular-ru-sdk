#### `@angular-ru/common/pipes`

-   `MutableTypePipe`

```ts
import { Immutable } from '@angular-ru/typings';
import { Component } from '@angular/core';
import { Data } from './data';

@Component({
    //...
    template: `<data [list]="data | mutable"></data>`
})
export class AppComponent {
    public data: Immutable<Data[]> = [];
}
```
