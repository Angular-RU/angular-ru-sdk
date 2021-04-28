### 28.04.2021 @angular-ru/common

-   before

```ts
@NgModule({
    imports: [AmountFormatModule]
})
export class AppModule {}
```

```html
<input formControlName="disputedAmount" amount-format [max-digits]="0" [min-digits]="0" />
```

-   after

```ts
@NgModule({
    imports: [AmountFormatDirectiveModule]
})
export class AppModule {}
```

```html
<input
    amountFormat
    formControlName="disputedAmount"
    [amountFormatOptions]="{ lang: 'ru-RU', formatOptions: { maximumFractionDigits: 0 }}"
/>
```

### 19.03.2021 @angular-ru/ng-table-builder

-   `TableBuilderComponent<T>` required generic type,
-   `[exclude-keys]` only support `ExcludePattern<T>[]` instead `(string | RegExp)[]`
-   `TableRow` removed as redundant type

### 19.03.2021 @angular-ru/common

-   `getValueByPath(...)` now also return null value,
-   `new DeepPathPipe().transform(...)` now return `K | string | null | undefined` value
-   `new DefaultValue().transform(...)` now return `PlainObject | T | string | null` value

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
