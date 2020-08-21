# Flex Layouts

You can use our flex directives instead of writing css rules in every component.

## Install

```bash
$ npm install @angular-ru/flex-layout
```

```ts
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular-ru/flex-layout';
...

@NgModule({
    imports: [
        FlexLayoutModule.forRoot()
    ]
})
export class AppModule {}
```
