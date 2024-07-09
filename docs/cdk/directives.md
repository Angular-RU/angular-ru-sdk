#### `@angular-ru/cdk/directives`

- `InitialFocusDirective, InitialFocusModule`
- Selector: `initialFocus`

- API:

  - `Input() focusDisabled: boolean` - default: `false`

```typescript
import {InitialFocusModule} from '@angular-ru/cdk/directives';
import {Component, NgModule} from '@angular/core';

@NgModule({
  // ..
  imports: [InitialFocusModule],
})
export class AppModule {}

@Component({
  //...
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

- `AmountFormatDirective, AmountFormatDirectiveModule`

```typescript
import {AmountFormatDirectiveModule} from '@angular-ru/cdk/directives';
import {Component, NgModule} from '@angular/core';

@NgModule({
  // ..
  imports: [AmountFormatDirectiveModule],
})
export class AppModule {}

@Component({
  //...
  template: `
    <input
      amountFormat
      value="10000000"
    />
  `, // 1 000 000
})
export class AppComponent {}
```

- `ConvertCaseDirective, ConvertCaseDirectiveModule`

```typescript
import {ConvertCaseDirectiveModule} from '@angular-ru/cdk/directives';
import {Component, NgModule} from '@angular/core';

@NgModule({
  // ..
  imports: [ConvertCaseDirectiveModule],
})
export class AppModule {}

@Component({
  //...
  template: `
    <input
      convertCase
      placeholder="ru"
    />
  `, // RU
})
export class AppComponent {}
```

- `DisableControlDirective, DisableControlDirectiveModule`

```typescript
import {DisableControlDirectiveModule} from '@angular-ru/cdk/directives';
import {Component, NgModule} from '@angular/core';

@NgModule({
  // ..
  imports: [DisableControlDirectiveModule],
})
export class AppModule {}

@Component({
  //...
  template: `
    <input
      disableControl
      formControlName="name"
    />
  `, // disabled = true
})
export class AppComponent {}
```

- `MaxLengthDirective, MaxLengthDirectiveModule`

```typescript
import {MaxLengthDirectiveModule} from '@angular-ru/cdk/directives';
import {Component, NgModule} from '@angular/core';

@NgModule({
  // ..
  imports: [MaxLengthDirectiveModule],
})
export class AppModule {}

@Component({
  //...
  template: `
    <input
      maxLength="3000"
      placeholder="3001"
    />
  `, // empty value
})
export class AppComponent {}
```

- `TrimInputDirective, TrimInputModule`
- Selector: `trimInput`

API:

- `@Input('trimDisabled') disabled: boolean` - default: `false`

```typescript
import {TrimInputModule} from '@angular-ru/cdk/directives';
import {Component, NgModule} from '@angular/core';

@NgModule({
  // ..
  imports: [TrimInputModule],
})
export class AppModule {}

@Component({
  //...
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

- `SplitStringDirective, SplitStringModule`

```typescript
import {SplitStringModule, SplitStringOptions} from '@angular-ru/cdk/directives';
import {Component, NgModule} from '@angular/core';

@NgModule({
  // ..
  imports: [SplitStringModule],
})
export class AppModule {}

@Component({
  selector: 'test',
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

- `InputFilterDirective, InputFilterModule`

```typescript
import {InputFilterModule, FilterPredicate} from '@angular-ru/cdk/directives';
import {Component, NgModule} from '@angular/core';

@NgModule({
  // ..
  imports: [InputFilterModule],
})
export class AppModule {}

@Component({
  //...
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
