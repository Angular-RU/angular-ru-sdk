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

-   `DetectBrowserPipe, DetectBrowserPipeModule`

```ts
import { DetectBrowserPipeModule } from '@angular-ru/common/pipes';
import { Component, NgModule } from '@angular/core';

@NgModule({
    // ..
    imports: [DetectBrowserPipeModule]
})
export class AppModule {}

@Component({
    //...
    template: `{{ browser | detectBrowser }}` // Chrome 84
})
export class AppComponent {
    public browser =
        'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.125 Safari/537.36';
}
```

-   `IsStringPipe, IsStringPipeModule`

```ts
import { IsStringPipeModule } from '@angular-ru/common/pipes';
import { Component, NgModule } from '@angular/core';

@NgModule({
    // ..
    imports: [IsStringPipeModule]
})
export class AppModule {}

@Component({
    //...
    template: `{{ data | isString }}` // true
})
export class AppComponent {
    public data = 'hello world';
}
```

-   `IsArrayPipe, IsArrayPipeModule`

```ts
import { IsArrayPipeModule } from '@angular-ru/common/pipes';
import { Component, NgModule } from '@angular/core';

@NgModule({
    // ..
    imports: [IsArrayPipeModule]
})
export class AppModule {}

@Component({
    //...
    template: `{{ data | isArray }}` // true
})
export class AppComponent {
    public data = [];
}
```

-   `ToStringPipe, ToStringPipeModule`

```ts
import { ToStringPipeModule } from '@angular-ru/common/pipes';
import { Component, NgModule } from '@angular/core';

@NgModule({
    // ..
    imports: [ToStringPipeModule]
})
export class AppModule {}

@Component({
    //...
    template: `{{ data | toString }}` // "1,2"
})
export class AppComponent {
    public data = [1, 2];
}
```

-   `ToNumberPipe, ToNumberPipeModule`

```ts
import { ToNumberPipeModule } from '@angular-ru/common/pipes';
import { Component, NgModule } from '@angular/core';

@NgModule({
    // ..
    imports: [ToNumberPipeModule]
})
export class AppModule {}

@Component({
    //...
    template: `{{ data | toNumber }}` // 12
})
export class AppComponent {
    public data = '12';
}
```

-   `FormatDatePipe, FormatDatePipeModule`

```ts
import { FormatDatePipeModule } from '@angular-ru/common/pipes';
import { Component, NgModule } from '@angular/core';

@NgModule({
    // ..
    imports: [FormatDatePipeModule]
})
export class AppModule {}

@Component({
    //...
    template: `{{ data | formatDate }}` // 11.12.2018
})
export class AppComponent {
    public data = 1544532097434;
}
```

-   `SafePipe, SafePipeModule`

```ts
import { SafePipeModule } from '@angular-ru/common/pipes';
import { Component, NgModule } from '@angular/core';

@NgModule({
    // ..
    imports: [SafePipeModule]
})
export class AppModule {}

@Component({
    //...
    template: `<div [innerHTML]="data | safe: 'html'"></div>`
})
export class AppComponent {
    public data = '<p>Hello world</p>';
}
```

-   `NumberFormatPipe, NumberFormatPipeModule`

```ts
import { NumberFormatPipeModule } from '@angular-ru/common/pipes';
import { Component, NgModule } from '@angular/core';

@NgModule({
    // ..
    imports: [NumberFormatPipeModule]
})
export class AppModule {}

@Component({
    //...
    template: `{{ data | numberFormat }}` // 1 500 300,5
})
export class AppComponent {
    public data = 1500300.5;
}
```

-   `HttpReplacerPipe, HttpReplacerPipeModule`

```ts
import { HttpReplacerPipeModule } from '@angular-ru/common/pipes';
import { Component, NgModule } from '@angular/core';

@NgModule({
    // ..
    imports: [HttpReplacerPipeModule]
})
export class AppModule {}

@Component({
    //...
    template: `{{ data | httpReplacer }}` // hello.com/new
})
export class AppComponent {
    public data = 'https://www.hello.com/new/index.php';
}
```

-   `TakeFirstItemPipe, TakeFirstItemPipeModule`

```ts
import { TakeFirstItemPipeModule } from '@angular-ru/common/pipes';
import { Component, NgModule } from '@angular/core';

@NgModule({
    // ..
    imports: [TakeFirstItemPipeModule]
})
export class AppModule {}

@Component({
    //...
    template: `{{ data | takeFirstItem }}` // 1
})
export class AppComponent {
    public data = [1, 2];
}
```

-   `TakeSecondItemPipe, TakeSecondItemPipeModule`

```ts
import { TakeSecondItemPipeModule } from '@angular-ru/common/pipes';
import { Component, NgModule } from '@angular/core';

@NgModule({
    // ..
    imports: [TakeSecondItemPipeModule]
})
export class AppModule {}

@Component({
    //...
    template: `{{ data | takeSecondItem }}` // 2
})
export class AppComponent {
    public data = [1, 2];
}
```

-   `DateToNativePipe, DateToNativePipeModule`

```ts
import { DateToNativePipeModule } from '@angular-ru/common/pipes';
import { Component, NgModule } from '@angular/core';

@NgModule({
    // ..
    imports: [DateToNativePipeModule]
})
export class AppModule {}

@Component({
    //...
    template: `{{ data | dateNative }}` // Date(type)
})
export class AppComponent {
    public data = '27.02.2019 14:25';
}
```

-   `EntrySingleSetPipe, EntrySingleSetPipeModule`

```ts
import { EntrySingleSetPipeModule } from '@angular-ru/common/pipes';
import { Component, NgModule } from '@angular/core';

@NgModule({
    // ..
    imports: [EntrySingleSetPipeModule]
})
export class AppModule {}

@Component({
    //...
    template: `{{ 'a' | entrySingleSet: setList }}` // true
})
export class AppComponent {
    public setList = new Set(['a']);
}
```

-   `MarkByFilterPipe, MarkByFilterPipeModuleModule`

```ts
import { MarkByFilterPipeModule } from '@angular-ru/common/pipes';
import { Component, NgModule } from '@angular/core';

@NgModule({
    // ..
    imports: [MarkByFilterPipeModule]
})
export class AppModule {}

@Component({
    //...
    template: `{{ 'hello word' | markByFilter: filter }}` // hello <span style="background: #ffdd2d">world</span>
})
export class AppComponent {
    public filter = 'world';
}
```

-   `MarkByFilterPipe, MarkByFilterPipeModuleModule`

```ts
import { ObjectSizePipeModule } from '@angular-ru/common/pipes';
import { Component, NgModule } from '@angular/core';

@NgModule({
    // ..
    imports: [ObjectSizePipeModule]
})
export class AppModule {}

@Component({
    //...
    template: `
        <!-- result: 2 -->
        {{ [{ a: 1 }, { a: 2 }] | objectSize }}

        <!-- result: 3 -->
        {{ { a: 1, b: 2, c: 3 } | objectSize }}
    `
})
export class AppComponent {
    public filter = 'world';
}
```
