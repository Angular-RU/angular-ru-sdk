### 1.07.2021 @angular-ru/common

-   before

```ts
checkValueIsEmpty('null'); // true
```

-   after

```ts
checkValueIsEmpty('null'); // false
```

### 11.05.2021 @angular-ru/common

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
    imports: [AmountFormatModule]
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

### 9.05.2021 @angular-ru/common

```ts
// before changes declaration
NumberFormatPipe.transform<T = string>(value?: string | number, options?: NumberFormatOptions): T;

// after changes declaration
NumberFormatPipe.transform(value: string | number | undefined | null, options?: NumberFormatOptions): string;
```

### 7.05.2021 @angular-ru/common

```ts
// before changes declaration
deepClone<T>(value: T | null | undefined): Exclude<T | null, undefined>;

// after changes declaration
deepClone<T>(value?: T): T;
```

### 7.05.2021 @angular-ru/common

We no longer support the weird fallback option, however, now there is an optional parameter to specify the localization:

```ts
// before changes declaration
toNumber(value: number | string, fallback?: number): number;

// after changes declaration
toNumber(value: number | string, locale?): number; // locale is 'ru-RU' by default
```

```ts
expect(toNumber('30 000,65')).toEqual(30000.65);
expect(toNumber('30,000.65', 'en-IN')).toEqual(30000.65);
expect(toNumber('30.000,65', 'de')).toEqual(30000.65);
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
