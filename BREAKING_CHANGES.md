### 17.03.2021 @angular-ru/ng-excel-builder

-   `ExcelBuilderModule` should be called with `forRoot` method in `AppModule`
-   if you use `TranslateModule` from `@ngx-translate/core` then you need past

```ts
import { EXCEL_BUILDER_NGX_TRANSLATE_FALLBACK_PROVIDER, ExcelBuilderModule } from '@angular-ru/ng-excel-builder';

@NgModule({
    // ...
    imports: [TranslateModule.forRoot(), ExcelBuilderModule.forRoot()],
    providers: [EXCEL_BUILDER_NGX_TRANSLATE_FALLBACK_PROVIDER]
})
export class AppModule {}
```
