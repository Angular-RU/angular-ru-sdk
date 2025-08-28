#### `@angular-ru/cdk/pipes`

- `MutableTypePipe`

```typescript
import {MutableTypePipe} from '@angular-ru/cdk/pipes';
import {Component} from '@angular/core';
import {Immutable} from '@angular-ru/typings';
import {Data} from './data';

@Component({
  //...
  imports: [MutableTypePipe],
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

- `DeepPathPipe`

```typescript
import {DeepPathPipe} from '@angular-ru/cdk/pipes';
import {Component} from '@angular/core';

@Component({
  //...
  imports: [DeepPathPipe],
  template: `
    {{ data | deepPath: 'a.b.c' }}
  `, // view: 'hello'
})
export class AppComponent {
  public data = {a: {b: {c: 'hello'}}};
}
```

- `DefaultValuePipe`

```typescript
import {DefaultValuePipe} from '@angular-ru/cdk/pipes';
import {Component} from '@angular/core';

@Component({
  //...
  imports: [DefaultValuePipe],
  template: `
    {{ data | defaultValue: '-' }}
  `, // view: '-'
})
export class AppComponent {
  public data = null;
}
```

- `IsNotNullPipe`

```typescript
import {IsNotNullPipe} from '@angular-ru/cdk/pipes';
import {Component} from '@angular/core';

@Component({
  //...
  imports: [IsNotNullPipe],
  template: `
    {{ data | isNotNull }}
  `, // false
})
export class AppComponent {
  public data = null;
}
```

- `IsNilPipe`

```typescript
import {IsNilPipe} from '@angular-ru/cdk/pipes';
import {Component} from '@angular/core';

@Component({
  //...
  imports: [IsNilPipe],
  template: `
    {{ data | isNil }}
  `, // true
})
export class AppComponent {
  public data = null;
}
```

- `IsObjectPipe`

```typescript
import {IsObjectPipe} from '@angular-ru/cdk/pipes';
import {Component} from '@angular/core';

@Component({
  //...
  imports: [IsObjectPipe],
  template: `
    {{ data | isObject }}
  `, // true
})
export class AppComponent {
  public data = {};
}
```

- `DetectBrowserPipe`

```typescript
import {DetectBrowserPipe} from '@angular-ru/cdk/pipes';
import {Component} from '@angular/core';

@Component({
  //...
  imports: [DetectBrowserPipe],
  template: `
    {{ browser | detectBrowser }}
  `, // Chrome 84
})
export class AppComponent {
  public browser =
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.125 Safari/537.36';
}
```

- `IsStringPipe`

```typescript
import {IsStringPipe} from '@angular-ru/cdk/pipes';
import {Component} from '@angular/core';

@Component({
  //...
  imports: [IsStringPipe],
  template: `
    {{ data | isString }}
  `, // true
})
export class AppComponent {
  public data = 'hello world';
}
```

- `IsArrayPipe`

```typescript
import {IsArrayPipe} from '@angular-ru/cdk/pipes';
import {Component} from '@angular/core';

@Component({
  //...
  imports: [IsArrayPipe],
  template: `
    {{ data | isArray }}
  `, // true
})
export class AppComponent {
  public data = [];
}
```

- `ToStringPipe`

```typescript
import {ToStringPipe} from '@angular-ru/cdk/pipes';
import {Component} from '@angular/core';

@Component({
  //...
  imports: [ToStringPipe],
  template: `
    {{ data | toString }}
  `, // "1,2"
})
export class AppComponent {
  public data = [1, 2];
}
```

- `ToNumberPipe`

```typescript
import {ToNumberPipe} from '@angular-ru/cdk/pipes';
import {Component} from '@angular/core';

@Component({
  //...
  imports: [ToNumberPipe],
  template: `
    {{ data | toNumber }}
  `, // 12
})
export class AppComponent {
  public data = '12';
}
```

- `FormatDatePipe`

```typescript
import {FormatDatePipe} from '@angular-ru/cdk/pipes';
import {Component} from '@angular/core';

@Component({
  //...
  imports: [FormatDatePipe],
  template: `
    {{ data | formatDate }}
  `, // 11.12.2018
})
export class AppComponent {
  public data = 1544532097434;
}
```

- `SafePipe`

```typescript
import {SafePipe} from '@angular-ru/cdk/pipes';
import {Component} from '@angular/core';

@Component({
  //...
  imports: [SafePipe],
  template: `
    <div [innerHTML]="data | safe: 'html'"></div>
  `,
})
export class AppComponent {
  public data = '<p>Hello world</p>';
}
```

- `NumberFormatPipe`

```typescript
import {NumberFormatPipe} from '@angular-ru/cdk/pipes';
import {Component} from '@angular/core';

@Component({
  //...
  imports: [NumberFormatPipe],
  template: `
    {{ data | numberFormat }}
  `, // 1 500 300,5
})
export class AppComponent {
  public data = 1500300.5;
}
```

- `HttpReplacerPipe`

```typescript
import {HttpReplacerPipe} from '@angular-ru/cdk/pipes';
import {Component} from '@angular/core';

@Component({
  //...
  imports: [HttpReplacerPipe],
  template: `
    {{ data | httpReplacer }}
  `, // hello.com/new
})
export class AppComponent {
  public data = 'https://www.hello.com/new/index.php';
}
```

- `TakeFirstItemPipe`

```typescript
import {TakeFirstItemPipe} from '@angular-ru/cdk/pipes';
import {Component} from '@angular/core';

@Component({
  //...
  imports: [TakeFirstItemPipe],
  template: `
    {{ data | takeFirstItem }}
  `, // 1
})
export class AppComponent {
  public data = [1, 2];
}
```

- `TakeSecondItemPipe`

```typescript
import {TakeSecondItemPipe} from '@angular-ru/cdk/pipes';
import {Component} from '@angular/core';

@Component({
  //...
  imports: [TakeSecondItemPipe],
  template: `
    {{ data | takeSecondItem }}
  `, // 2
})
export class AppComponent {
  public data = [1, 2];
}
```

- `DateToNativePipe`

```typescript
import {DateToNativePipe} from '@angular-ru/cdk/pipes';
import {Component} from '@angular/core';

@Component({
  //...
  imports: [DateToNativePipe],
  template: `
    {{ data | dateNative }}
  `, // Date(type)
})
export class AppComponent {
  public data = '27.02.2019 14:25';
}
```

- `EntrySingleSetPipe`

```typescript
import {EntrySingleSetPipe} from '@angular-ru/cdk/pipes';
import {Component} from '@angular/core';

@Component({
  //...
  imports: [EntrySingleSetPipe],
  template: `
    {{ 'a' | entrySingleSet: setList }}
  `, // true
})
export class AppComponent {
  public setList = new Set(['a']);
}
```

- `MarkByFilterPipe`

```typescript
import {MarkByFilterPipe} from '@angular-ru/cdk/pipes';
import {Component} from '@angular/core';

@Component({
  //...
  imports: [MarkByFilterPipe],
  template: `
    {{ 'hello word' | markByFilter: filter }}
  `, // hello <span style="background: #ffdd2d">world</span>
})
export class AppComponent {
  public filter = 'world';
}
```

- `DisplayItemPipe`

```typescript
import {DisplayItemPipe} from '@angular-ru/cdk/pipes';
import {Component} from '@angular/core';

@Component({
  //...
  imports: [DisplayItemPipe],
  template: `
    {{ entity | displayItem: 'value.name' }}
  `, // A
})
export class AppComponent {
  public entity = {value: {name: 'A'}};
}
```

- `ObjectSizePipe`

```typescript
import {ObjectSizePipe} from '@angular-ru/cdk/pipes';
import {Component} from '@angular/core';

@Component({
  //...
  imports: [ObjectSizePipe],
  template: `
    <!-- result: 2 -->
    {{ [{a: 1}, {a: 2}] | objectSize }}

    <!-- result: 3 -->
    {{ {a: 1, b: 2, c: 3} | objectSize }}
  `,
})
export class AppComponent {}
```

- `MergeCssClassesPipe`

```typescript
import {MergeCssClassesPipe} from '@angular-ru/cdk/pipes';
import {Component} from '@angular/core';

@Component({
  //...
  imports: [MergeCssClassesPipe],
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

- `JoinPipe`

```typescript
import {JoinPipe} from '@angular-ru/cdk/pipes';
import {Component} from '@angular/core';

@Component({
  //...
  imports: [JoinPipe],
  template: `
    {{ [1, 2] | join }}
    <!-- result: 1,2 -->
  `,
})
export class AppComponent {}
```

```typescript
import {JoinPipe} from '@angular-ru/cdk/pipes';
import {Component} from '@angular/core';

@Component({
  //...
  imports: [JoinPipe],
  template: `
    <p [innerHTML]="[1, 2] | join: {separator: '<br>'}"></p>
    <!-- result html: 1<br>2 -->
  `,
})
export class AppComponent {}
```

```typescript
import {JoinPipe, JoinMapTransformer} from '@angular-ru/cdk/pipes';
import {Component} from '@angular/core';

@Component({
  //...
  imports: [JoinPipe],
  template: `
    <p [innerHTML]="[{a: 1}, {a: 2}, {a: 3}, {a: 4}] | join: {separator: '::', mapTransformer: transformer}"></p>
    <!-- result html: 1 :: 10 :: 11 :: 100 -->
  `,
})
export class AppComponent {
  public transformer: JoinMapTransformer<{a: number}> = (item: {a: number}): string => item.a.toString(2);
}
```

- `BracePipe`

```typescript
import {BracePipe} from '@angular-ru/cdk/pipes';
import {Component} from '@angular/core';

@Component({
  //...
  imports: [BracePipe],
  template: `
    <span>Edit selected records {{ count | brace }}</span>
    <!--Edit selected records (42)-->
  `,
})
export class AppComponent {
  public count: number = 42;
}
```

- `FilterUniquePipe`

```typescript
import {FilterUniquePipe} from '@angular-ru/cdk/pipes';
import {PlainObject} from '@angular-ru/cdk-typings';
import {Component} from '@angular/core';

@Component({
  //...
  imports: [FilterUniquePipe],
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

- `TypeAsPipe`

```typescript
import {TypeAsPipe} from '@angular-ru/cdk/pipes';

type SomeType = {a: number};

@Component({
  //...
  imports: [TypeAsPipe],
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

- `AtPipe`

```typescript
import {AtPipe} from '@angular-ru/cdk/pipes';
import {Component} from '@angular/core';

@Component({
  //...
  imports: [AtPipe],
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

```typescript
import {
  HasItemsPipe,
  HasManyItemsPipe,
  HasNoItemsPipe,
  HasOneItemPipe,
  HasAtMostOneItemPipe,
} from '@angular-ru/cdk/pipes';

@Component({
  //...
  imports: [HasItemsPipe, HasManyItemsPipe, HasNoItemsPipe, HasOneItemPipe, HasAtMostOneItemPipe],
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

- `IncludesPipe`

```typescript
import {IncludesPipe} from '@angular-ru/cdk/pipes';
import {Component} from '@angular/core';

@Component({
  //...
  imports: [IncludesPipe],
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

- `HasPipe`

```typescript
import {HasPipe} from '@angular-ru/cdk/pipes';
import {Component} from '@angular/core';

@Component({
  //...
  imports: [HasPipe],
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

- `CoerceBooleanPipe`

```typescript
import {CoerceBooleanPipe} from '@angular-ru/cdk/pipes';
import {Component} from '@angular/core';

@Component({
  //...
  imports: [CoerceBooleanPipe],
  template: `
        <mat-select [multiple]="multiple | coerceBoolean">first</p>
    `,
})
export class AppComponent {
  @Input() public multiple?: string | number | boolean;
}
```

- `DeclinationOfNumberPipe`

```typescript
import {DeclinationOfNumberPipe} from '@angular-ru/cdk/pipes';
import {Component} from '@angular/core';

@Component({
  //...
  imports: [DeclinationOfNumberPipe],
  template: `
    {{ numberVal | declinationOfNumber: ['арбуз', 'арбуза', 'арбузов'] }}
  `,
})
export class AppComponent {
  @Input() public numberVal: number;
}
```
