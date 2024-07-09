#### `@angular-ru/cdk/pipes`

- `MutableTypePipe, MutableTypePipeModule`

```typescript
import {MutableTypePipeModule} from '@angular-ru/cdk/pipes';
import {Component, NgModule} from '@angular/core';
import {Immutable} from '@angular-ru/typings';
import {Data} from './data';

@NgModule({
  // ..
  imports: [MutableTypePipeModule],
})
export class AppModule {}

@Component({
  //...
  template: `
    <data [list]="data | mutable"></data>
  `,
})
export class AppComponent {
  public data: Immutable<Data[]> = [];
}
```

```typescript
import {Immutable} from '@angular-ru/typings';
import {MutableTypePipe} from '@angular-ru/cdk/pipes';

const obj: Immutable<{a: string}> = {a: 'str'};
const mutableObj = new MutableTypePipe().transform(obj); // return { a: string }

mutableObj.a = 'str2';

expect(obj.a).toEqual('str2');
expect(mutableObj.a).toEqual('str2');
```

- `DeepPathPipe, DeepPathPipeModule`

```typescript
import {DeepPathPipeModule} from '@angular-ru/cdk/pipes';
import {Component, NgModule} from '@angular/core';

@NgModule({
  // ..
  imports: [DeepPathPipeModule],
})
export class AppModule {}

@Component({
  //...
  template: `
    {{ data | deepPath: 'a.b.c' }}
  `, // view: 'hello'
})
export class AppComponent {
  public data = {a: {b: {c: 'hello'}}};
}
```

- `DefaultValuePipe, DefaultValuePipeModule`

```typescript
import {DefaultValuePipeModule} from '@angular-ru/cdk/pipes';
import {Component, NgModule} from '@angular/core';

@NgModule({
  // ..
  imports: [DefaultValuePipeModule],
})
export class AppModule {}

@Component({
  //...
  template: `
    {{ data | defaultValue: '-' }}
  `, // view: '-'
})
export class AppComponent {
  public data = null;
}
```

- `IsNotNullPipe, IsNotNullPipeModule`

```typescript
import {IsNotNullPipeModule} from '@angular-ru/cdk/pipes';
import {Component, NgModule} from '@angular/core';

@NgModule({
  // ..
  imports: [IsNotNullPipeModule],
})
export class AppModule {}

@Component({
  //...
  template: `
    {{ data | isNotNull }}
  `, // false
})
export class AppComponent {
  public data = null;
}
```

- `IsNilPipe, IsNilPipeModule`

```typescript
import {IsNilPipeModule} from '@angular-ru/cdk/pipes';
import {Component, NgModule} from '@angular/core';

@NgModule({
  // ..
  imports: [IsNilPipeModule],
})
export class AppModule {}

@Component({
  //...
  template: `
    {{ data | isNil }}
  `, // true
})
export class AppComponent {
  public data = null;
}
```

- `IsObjectPipe, IsObjectPipeModule`

```typescript
import {IsObjectPipeModule} from '@angular-ru/cdk/pipes';
import {Component, NgModule} from '@angular/core';

@NgModule({
  // ..
  imports: [IsObjectPipeModule],
})
export class AppModule {}

@Component({
  //...
  template: `
    {{ data | isObject }}
  `, // true
})
export class AppComponent {
  public data = {};
}
```

- `DetectBrowserPipe, DetectBrowserPipeModule`

```typescript
import {DetectBrowserPipeModule} from '@angular-ru/cdk/pipes';
import {Component, NgModule} from '@angular/core';

@NgModule({
  // ..
  imports: [DetectBrowserPipeModule],
})
export class AppModule {}

@Component({
  //...
  template: `
    {{ browser | detectBrowser }}
  `, // Chrome 84
})
export class AppComponent {
  public browser =
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.125 Safari/537.36';
}
```

- `IsStringPipe, IsStringPipeModule`

```typescript
import {IsStringPipeModule} from '@angular-ru/cdk/pipes';
import {Component, NgModule} from '@angular/core';

@NgModule({
  // ..
  imports: [IsStringPipeModule],
})
export class AppModule {}

@Component({
  //...
  template: `
    {{ data | isString }}
  `, // true
})
export class AppComponent {
  public data = 'hello world';
}
```

- `IsArrayPipe, IsArrayPipeModule`

```typescript
import {IsArrayPipeModule} from '@angular-ru/cdk/pipes';
import {Component, NgModule} from '@angular/core';

@NgModule({
  // ..
  imports: [IsArrayPipeModule],
})
export class AppModule {}

@Component({
  //...
  template: `
    {{ data | isArray }}
  `, // true
})
export class AppComponent {
  public data = [];
}
```

- `ToStringPipe, ToStringPipeModule`

```typescript
import {ToStringPipeModule} from '@angular-ru/cdk/pipes';
import {Component, NgModule} from '@angular/core';

@NgModule({
  // ..
  imports: [ToStringPipeModule],
})
export class AppModule {}

@Component({
  //...
  template: `
    {{ data | toString }}
  `, // "1,2"
})
export class AppComponent {
  public data = [1, 2];
}
```

- `ToNumberPipe, ToNumberPipeModule`

```typescript
import {ToNumberPipeModule} from '@angular-ru/cdk/pipes';
import {Component, NgModule} from '@angular/core';

@NgModule({
  // ..
  imports: [ToNumberPipeModule],
})
export class AppModule {}

@Component({
  //...
  template: `
    {{ data | toNumber }}
  `, // 12
})
export class AppComponent {
  public data = '12';
}
```

- `FormatDatePipe, FormatDatePipeModule`

```typescript
import {FormatDatePipeModule} from '@angular-ru/cdk/pipes';
import {Component, NgModule} from '@angular/core';

@NgModule({
  // ..
  imports: [FormatDatePipeModule],
})
export class AppModule {}

@Component({
  //...
  template: `
    {{ data | formatDate }}
  `, // 11.12.2018
})
export class AppComponent {
  public data = 1544532097434;
}
```

- `SafePipe, SafePipeModule`

```typescript
import {SafePipeModule} from '@angular-ru/cdk/pipes';
import {Component, NgModule} from '@angular/core';

@NgModule({
  // ..
  imports: [SafePipeModule],
})
export class AppModule {}

@Component({
  //...
  template: `
    <div [innerHTML]="data | safe: 'html'"></div>
  `,
})
export class AppComponent {
  public data = '<p>Hello world</p>';
}
```

- `NumberFormatPipe, NumberFormatPipeModule`

```typescript
import {NumberFormatPipeModule} from '@angular-ru/cdk/pipes';
import {Component, NgModule} from '@angular/core';

@NgModule({
  // ..
  imports: [NumberFormatPipeModule],
})
export class AppModule {}

@Component({
  //...
  template: `
    {{ data | numberFormat }}
  `, // 1 500 300,5
})
export class AppComponent {
  public data = 1500300.5;
}
```

- `HttpReplacerPipe, HttpReplacerPipeModule`

```typescript
import {HttpReplacerPipeModule} from '@angular-ru/cdk/pipes';
import {Component, NgModule} from '@angular/core';

@NgModule({
  // ..
  imports: [HttpReplacerPipeModule],
})
export class AppModule {}

@Component({
  //...
  template: `
    {{ data | httpReplacer }}
  `, // hello.com/new
})
export class AppComponent {
  public data = 'https://www.hello.com/new/index.php';
}
```

- `TakeFirstItemPipe, TakeFirstItemPipeModule`

```typescript
import {TakeFirstItemPipeModule} from '@angular-ru/cdk/pipes';
import {Component, NgModule} from '@angular/core';

@NgModule({
  // ..
  imports: [TakeFirstItemPipeModule],
})
export class AppModule {}

@Component({
  //...
  template: `
    {{ data | takeFirstItem }}
  `, // 1
})
export class AppComponent {
  public data = [1, 2];
}
```

- `TakeSecondItemPipe, TakeSecondItemPipeModule`

```typescript
import {TakeSecondItemPipeModule} from '@angular-ru/cdk/pipes';
import {Component, NgModule} from '@angular/core';

@NgModule({
  // ..
  imports: [TakeSecondItemPipeModule],
})
export class AppModule {}

@Component({
  //...
  template: `
    {{ data | takeSecondItem }}
  `, // 2
})
export class AppComponent {
  public data = [1, 2];
}
```

- `DateToNativePipe, DateToNativePipeModule`

```typescript
import {DateToNativePipeModule} from '@angular-ru/cdk/pipes';
import {Component, NgModule} from '@angular/core';

@NgModule({
  // ..
  imports: [DateToNativePipeModule],
})
export class AppModule {}

@Component({
  //...
  template: `
    {{ data | dateNative }}
  `, // Date(type)
})
export class AppComponent {
  public data = '27.02.2019 14:25';
}
```

- `EntrySingleSetPipe, EntrySingleSetPipeModule`

```typescript
import {EntrySingleSetPipeModule} from '@angular-ru/cdk/pipes';
import {Component, NgModule} from '@angular/core';

@NgModule({
  // ..
  imports: [EntrySingleSetPipeModule],
})
export class AppModule {}

@Component({
  //...
  template: `
    {{ 'a' | entrySingleSet: setList }}
  `, // true
})
export class AppComponent {
  public setList = new Set(['a']);
}
```

- `MarkByFilterPipe, MarkByFilterPipeModuleModule`

```typescript
import {MarkByFilterPipeModule} from '@angular-ru/cdk/pipes';
import {Component, NgModule} from '@angular/core';

@NgModule({
  // ..
  imports: [MarkByFilterPipeModule],
})
export class AppModule {}

@Component({
  //...
  template: `
    {{ 'hello word' | markByFilter: filter }}
  `, // hello <span style="background: #ffdd2d">world</span>
})
export class AppComponent {
  public filter = 'world';
}
```

- `DisplayItemPipe, DisplayItemPipeModule`

```typescript
import {DisplayItemPipeModule} from '@angular-ru/cdk/pipes';
import {Component, NgModule} from '@angular/core';

@NgModule({
  // ...
  imports: [DisplayItemPipeModule],
})
export class AppModule {}

@Component({
  // ...
  template: `
    {{ entity | displayItem: 'value.name' }}
  `, // A
})
export class AppComponent {
  public entity = {value: {name: 'A'}};
}
```

- `ObjectSizePipe, ObjectSizePipeModule`

```typescript
import {ObjectSizePipeModule} from '@angular-ru/cdk/pipes';
import {Component, NgModule} from '@angular/core';

@NgModule({
  // ..
  imports: [ObjectSizePipeModule],
})
export class AppModule {}

@Component({
  //...
  template: `
    <!-- result: 2 -->
    {{ [{a: 1}, {a: 2}] | objectSize }}

    <!-- result: 3 -->
    {{ {a: 1, b: 2, c: 3} | objectSize }}
  `,
})
export class AppComponent {}
```

- `MergeCssClassesPipe, MergeCssClassesPipeModule`

```typescript
import {MergeCssClassesPipe} from '@angular-ru/cdk/pipes';
import {Component, NgModule} from '@angular/core';

@NgModule({
  // ..
  imports: [MergeCssClassesPipe],
})
export class AppModule {}

@Component({
  //...
  template: `
    <div [ngClass]="'some-class' | mergeCssClasses: ['class-a', 'class-b'] : {enabled: isEnabled}">
      <!--
            result:
            {
                'some-class': true,
                'class-a': true,
                'class-b': true,
                enabled: false
            }
            -->
    </div>
  `,
})
export class AppComponent {
  public isEnabled = false;
}
```

- `JoinPipe, JoinPipeModule`

```typescript
import {JoinPipeModule} from '@angular-ru/cdk/pipes';
import {Component, NgModule} from '@angular/core';

@NgModule({
  // ..
  imports: [JoinPipeModule],
})
export class AppModule {}

@Component({
  //...
  template: `
    {{ [1, 2] | join }}
    <!-- result: 1,2 -->
  `,
})
export class AppComponent {}
```

```typescript
import {JoinPipeModule} from '@angular-ru/cdk/pipes';
import {Component, NgModule} from '@angular/core';

@NgModule({
  // ..
  imports: [JoinPipeModule],
})
export class AppModule {}

@Component({
  //...
  template: `
    <p [innerHTML]="[1, 2] | join: {separator: '<br>'}"></p>
    <!-- result html: 1<br>2 -->
  `,
})
export class AppComponent {}
```

```typescript
import {JoinPipeModule, JoinMapTransformer} from '@angular-ru/cdk/pipes';
import {Component, NgModule} from '@angular/core';

@NgModule({
  // ..
  imports: [JoinPipeModule],
})
export class AppModule {}

@Component({
  //...
  template: `
    <p [innerHTML]="[{a: 1}, {a: 2}, {a: 3}, {a: 4}] | join: {separator: '::', mapTransformer: transformer}"></p>
    <!-- result html: 1 :: 10 :: 11 :: 100 -->
  `,
})
export class AppComponent {
  public transformer: JoinMapTransformer<{a: number}> = (item: {a: number}): string => item.a.toString(2);
}
```

- `BracePipe, BracePipeModule`

```typescript
import {BracePipeModule} from '@angular-ru/cdk/pipes';
import {Component, NgModule} from '@angular/core';

@NgModule({
  // ..
  imports: [BracePipeModule],
})
export class AppModule {}

@Component({
  //...
  template: `
    <span>Edit selected records {{ count | brace }}</span>
    <!--Edit selected records (42)-->
  `,
})
export class AppComponent {
  public count: number = 42;
}
```

- `FilterUniquePipe, FilterUniquePipeModule`

```typescript
import {FilterUniquePipeModule} from '@angular-ru/cdk/pipes';
import {PlainObject} from '@angular-ru/cdk-typings';
import {Component, NgModule} from '@angular/core';

@NgModule({
  // ..
  imports: [FilterUniquePipeModule],
})
export class AppModule {}

@Component({
  //...
  template: `
    <pre>{{ objects | filterUnique: 'name' | json }}</pre>
    <!-- [{ name: 'a'}, { name: 'b'}] -->

    <pre>{{ numbers | filterUnique | json }}</pre>
    <!-- [1, 2, 3, 4, 5] -->
  `,
})
export class AppComponent {
  public objects: PlainObject = [{name: 'a'}, {name: 'a'}, {name: 'b'}];
  public numbers: number[] = [1, 2, 3, 4, 5, 5, 4];
}
```

- `TypeAsPipe, TypeAsPipeModule`

```typescript
import {TypeAs} from '@angular-ru/cdk/pipes';

@NgModule({
  // ..
  imports: [TypeAsPipeModule],
})
export class AppModule {}

type SomeType = {a: number};

@Component({
  //...
  template: `
    <p *ngIf="notTyped | typeAs: typeSample as typed">
      {{ typed.a }}
      <!-- OK -->
      {{ typed.b }}
      <!-- Error: Property 'b' does not exist on type 'SomeType' -->
    </p>
  `,
})
export class AppComponent {
  public notTyped: any = {a: 1};
  public typeSample!: SomeType;
}
```

- `AtPipe, AtPipeModule`

```typescript
import {AtPipeModule} from '@angular-ru/cdk/pipes';

@NgModule({
  // ..
  imports: [AtPipeModule],
})
export class AppModule {}

@Component({
  //...
  template: `
    <p>{{ someArray | at: 0 }}</p>
    <!-- "first" -->
    <p>{{ someArray | at: -1 }}</p>
    <!-- "last" -->
  `,
})
export class AppComponent {
  public someArray = ['first', 'second', 'third', 'last'];
}
```

- `HasItems, HasManyItems, HasNoItems, HasOneItem, HasAtMostOneItem`
- `HasItemsModule, HasManyItemsModule, HasNoItemsModule, HasOneItemModule, HasAtMostOneItemModule`

```typescript
import {
  HasItemsModule,
  HasManyItemsModule,
  HasNoItemsModule,
  HasOneItemModule,
  HasAtMostOneItemModule,
} from '@angular-ru/cdk/pipes';

@NgModule({
  // ..
  imports: [HasItemsModule, HasManyItemsModule, HasNoItemsModule, HasOneItemModule, HasAtMostOneItemModule],
})
export class AppModule {}

@Component({
  //...
  template: `
    <pre *ngIf="someArray | hasItems"><!-- true --></pre>
    <pre *ngIf="someArray | hasManyItems"><!-- false --></pre>
    <pre *ngIf="someArray | hasNoItems"><!-- false --></pre>
    <pre *ngIf="someArray | hasOneItem"><!-- true --></pre>
    <pre *ngIf="someArray | hasAtMostOneItem"><!-- true --></pre>
  `,
})
export class AppComponent {
  public someArray: number[] = [1];
}
```

- `IncludesPipe, IncludesPipeModule`

```typescript
import {IncludesPipeModule} from '@angular-ru/cdk/pipes';

@NgModule({
  // ..
  imports: [IncludesPipeModule],
})
export class AppModule {}

@Component({
  //...
  template: `
    <p *ngIf="someArray | includes: 'first'">first</p>
    <p *ngIf="someArray | includes: 'fourth'">
      <!-- this will not appear -->
      fourth
    </p>
  `,
})
export class AppComponent {
  public someArray = ['first', 'second', 'third', 'last'];
}
```

- `HasPipe, HasPipeModule`

```typescript
import {HasPipeModule} from '@angular-ru/cdk/pipes';

@NgModule({
  // ..
  imports: [HasPipeModule],
})
export class AppModule {}

@Component({
  //...
  template: `
    <p *ngIf="someSet | has: 'first'">first</p>
    <p *ngIf="someSet | has: 'fourth'">
      <!-- this will not appear -->
      fourth
    </p>
  `,
})
export class AppComponent {
  public someSet = new Set(['first', 'second', 'third', 'last']);
}
```

- `CoerceBooleanPipe, CoerceBooleanPipeModule`

```typescript
import {CoerceBooleanPipeModule} from '@angular-ru/cdk/pipes';

@NgModule({
  // ..
  imports: [CoerceBooleanPipeModule],
})
export class AppModule {}

@Component({
  //...
  template: `
        <mat-select [multiple]="multiple | coerceBoolean">first</p>
    `,
})
export class AppComponent {
  @Input() public multiple?: string | number | boolean;
}
```

- `DeclinationOfNumberPipe, DeclinationOfNumberPipeModule`

```typescript
import {DeclinationOfNumberPipeModule} from '@angular-ru/cdk/pipes';

@NgModule({
  // ..
  imports: [DeclinationOfNumberPipeModule],
})
export class AppModule {}

@Component({
  //...
  template: `
    {{ numberVal | declinationOfNumber: ['арбуз', 'арбуза', 'арбузов'] }}
  `,
})
export class AppComponent {
  @Input() public numberVal: number;
}
```
