#### `@angular-ru/common/directives`

-   `InputFocusDirective, InitialFocusModule`

```ts
import { InitialFocusModule } from '@angular-ru/common/directives';
import { Component, NgModule } from '@angular/core';

@NgModule({
    // ..
    imports: [InitialFocusModule]
})
export class AppModule {}

@Component({
    //...
    template: `<input initialFocus placeholder="hello world" />`
})
export class AppComponent {}
```

-   `AmountFormatDirective, AmountFormatDirectiveModule`

```ts
import { AmountFormatDirectiveModule } from '@angular-ru/common/directives';
import { Component, NgModule } from '@angular/core';

@NgModule({
    // ..
    imports: [AmountFormatDirectiveModule]
})
export class AppModule {}

@Component({
    //...
    template: `<input amount-format placeholder="10000000" />` // 1 000 000
})
export class AppComponent {}
```

-   `ConvertCaseDirective, ConvertCaseDirectiveModule`

```ts
import { ConvertCaseDirectiveModule } from '@angular-ru/common/directives';
import { Component, NgModule } from '@angular/core';

@NgModule({
    // ..
    imports: [ConvertCaseDirectiveModule]
})
export class AppModule {}

@Component({
    //...
    template: `<input convertCase placeholder="ru" />` // RU
})
export class AppComponent {}
```

-   `DisableControlDirective, DisableControlDirectiveModule`

```ts
import { DisableControlDirectiveModule } from '@angular-ru/common/directives';
import { Component, NgModule } from '@angular/core';

@NgModule({
    // ..
    imports: [DisableControlDirectiveModule]
})
export class AppModule {}

@Component({
    //...
    template: `<input disableControl formControlName="name" />` // disabled = true
})
export class AppComponent {}
```

-   `MaxLengthDirective, MaxLengthDirectiveModule`

```ts
import { MaxLengthDirectiveModule } from '@angular-ru/common/directives';
import { Component, NgModule } from '@angular/core';

@NgModule({
    // ..
    imports: [MaxLengthDirectiveModule]
})
export class AppModule {}

@Component({
    //...
    template: `<input maxLength="3000" placeholder="3001" />` // empty value
})
export class AppComponent {}
```

-   `TrimInputDirective, TrimInputModule`

```ts
import { TrimInputModule } from '@angular-ru/common/directives';
import { Component, NgModule } from '@angular/core';

@NgModule({
    // ..
    imports: [TrimInputModule]
})
export class AppModule {}

@Component({
    //...
    template: `<input trimInput placeholder="  Hello  " />` // 'Hello'
})
export class AppComponent {}
```
