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

```ts
import { Immutable } from '@angular-ru/typings';
import { MutableTypePipe } from '@angular-ru/common/pipes';

const obj: Immutable<{ a: string }> = { a: 'str' };
const mutableObj = new MutableTypePipe().transform(obj); // return { a: string }

mutableObj.a = 'str2';

expect(obj.a).toEqual('str2');
expect(mutableObj.a).toEqual('str2');
```

-   `DeepPathPipe, DeepPathModule`

```ts
import { DeepPathModule } from '@angular-ru/common/pipes';
import { Component, NgModule } from '@angular/core';

@NgModule({
    // ..
    imports: [DeepPathModule]
})
export class AppModule {}

@Component({
    //...
    template: `{{ data | deepPath: 'a.b.c' }}` // view: 'hello'
})
export class AppComponent {
    public data = { a: { b: { c: 'hello' } } };
}
```

-   `DefaultValuePipe, DefaultValueModule`

```ts
import { DefaultValueModule } from '@angular-ru/common/pipes';
import { Component, NgModule } from '@angular/core';

@NgModule({
    // ..
    imports: [DefaultValueModule]
})
export class AppModule {}

@Component({
    //...
    template: `{{ data | default: '-' }}` // view: '-'
})
export class AppComponent {
    public data = null;
}
```
