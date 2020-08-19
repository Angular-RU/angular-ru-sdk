#### `@angular-ru/common/pipes`

-   `MutableTypePipe, MutableTypePipeModule`

```ts
import { MutableTypePipeModule } from '@angular-ru/common/pipes';
import { Component, NgModule } from '@angular/core';
import { Immutable } from '@angular-ru/typings';
import { Data } from './data';

@NgModule({
    // ..
    imports: [MutableTypePipeModule]
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

-   `DeepPathPipe, DeepPathPipeModule`

```ts
import { DeepPathPipeModule } from '@angular-ru/common/pipes';
import { Component, NgModule } from '@angular/core';

@NgModule({
    // ..
    imports: [DeepPathPipeModule]
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

-   `DefaultValuePipe, DefaultValuePipeModule`

```ts
import { DefaultValuePipeModule } from '@angular-ru/common/pipes';
import { Component, NgModule } from '@angular/core';

@NgModule({
    // ..
    imports: [DefaultValuePipeModule]
})
export class AppModule {}

@Component({
    //...
    template: `{{ data | defaultValue: '-' }}` // view: '-'
})
export class AppComponent {
    public data = null;
}
```

-   `IsNotNullPipe, IsNotNullPipeModule`

```ts
import { IsNotNullPipeModule } from '@angular-ru/common/pipes';
import { Component, NgModule } from '@angular/core';

@NgModule({
    // ..
    imports: [IsNotNullPipeModule]
})
export class AppModule {}

@Component({
    //...
    template: `{{ data | isNotNull }}` // false
})
export class AppComponent {
    public data = null;
}
```

-   `IsObjectPipe, IsObjectPipeModule`

```ts
import { IsObjectPipeModule } from '@angular-ru/common/pipes';
import { Component, NgModule } from '@angular/core';

@NgModule({
    // ..
    imports: [IsObjectPipeModule]
})
export class AppModule {}

@Component({
    //...
    template: `{{ data | isObject }}` // true
})
export class AppComponent {
    public data = {};
}
```
