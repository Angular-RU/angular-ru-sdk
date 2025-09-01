#### `@angular-ru/cdk/directives`

- `InitialFocus`
- Selector: `initialFocus`

- API:
  - `Input() focusDisabled: boolean` - default: `false`

```typescript
import {InitialFocus} from '@angular-ru/cdk/directives';
import {Component} from '@angular/core';

@Component({
  //...
  imports: [InitialFocus],
  template: `
    <input
      [focusDisabled]="false"
      initialFocus
      placeholder="hello world"
    />
  `,
})
export class AppComponent {}
```

- `AmountFormat`

```typescript
import {AmountFormat} from '@angular-ru/cdk/directives';
import {Component} from '@angular/core';

@Component({
  //...
  imports: [AmountFormat],
  template: `
    <input
      amountFormat
      value="10000000"
    />
  `, // 1 000 000
})
export class AppComponent {}
```

- `ConvertCase`

```typescript
import {ConvertCase} from '@angular-ru/cdk/directives';
import {Component} from '@angular/core';

@Component({
  //...
  imports: [ConvertCase],
  template: `
    <input
      convertCase
      placeholder="ru"
    />
  `, // RU
})
export class AppComponent {}
```

- `DisableControl`

```typescript
import {DisableControl} from '@angular-ru/cdk/directives';
import {Component} from '@angular/core';

@Component({
  //...
  imports: [DisableControl],
  template: `
    <input
      disableControl
      formControlName="name"
    />
  `, // disabled = true
})
export class AppComponent {}
```

- `MaxLength`

```typescript
import {MaxLength} from '@angular-ru/cdk/directives';
import {Component} from '@angular/core';

@Component({
  //...
  imports: [MaxLength],
  template: `
    <input
      maxLength="3000"
      placeholder="3001"
    />
  `, // empty value
})
export class AppComponent {}
```

- `TrimInput`
- Selector: `trimInput`

API:

- `@Input('trimDisabled') disabled: boolean` - default: `false`

```typescript
import {TrimInput} from '@angular-ru/cdk/directives';
import {Component} from '@angular/core';

@Component({
  //...
  imports: [TrimInput],
  template: `
    <input
      [trimDisabled]="false"
      trimInput
      placeholder="  Hello  "
    />
  `, // 'Hello'
})
export class AppComponent {}
```

- `SplitString`

```typescript
import {SplitString, SplitStringOptions} from '@angular-ru/cdk/directives';
import {Component} from '@angular/core';

@Component({
  selector: 'test',
  imports: [SplitString],
  template: `
        <form [formGroup]="form">
            <input type="text" formControlName="input1" splitString" />
            <input
                type="text"
                formControlName="input2"
                splitString
                [splitOptions]="splitStringOptions"
            />
        </form>
    `,
})
class TestComponent {
  public splitStringOptions?: Partial<SplitStringOptions> = {separator: /[,;\n+]/g, joinWith: ' + '};
  public form = this.fb.group({
    input1: ['one', 'two'],
    input2: ['three', 'four'],
  });
  /**
   * Native input1 value will be joined by default by comma ('one, two')
   * and will be automatically splitted
   * by default separator while user is typing.
   * Default separator is /[,;\n]/g (comma, semicolon, line break)
   *
   * Native input2 value will be joined with ' + ' ('three + four')
   * and will be splitted by specified separator /[,;\n+]/g
   */

  constructor(private readonly fb: FormBuilder) {}
}
```

- `InputFilter`

```typescript
import {InputFilter, FilterPredicate} from '@angular-ru/cdk/directives';
import {Component} from '@angular/core';

@Component({
  //...
  imports: [InputFilter],
  template: `
    <div [formGroup]="form">
      <input
        [filterDisabled]="false"
        [inputFilter]="predicate"
        matInput
        type="text"
        formControlName="value"
      />
    </div>
  `,
})
export class AppComponent {
  public predicate: FilterPredicate;

  constructor() {
    this.predicate = ['a', 'b', 'c'];
    this.predicate = /[a,b]+/;
    this.predicate = (item: string): boolean => item === 'a' || item === 'b';
  }
}
```
