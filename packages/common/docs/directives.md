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
