## `v19` Migration Guide

`v19` of `@angular-ru/cdk` and `@angular-ru/ngxs` has been updated to utilize the latest features from Angular `v20`.
This includes standalone components, environment providers, component input signals, and more. Because of this,
migration is slightly more involved than usual.

### Standalone components, directives, and pipes

All `NgModules` have been removed. Components, directives, and pipes have been made standalone and some of the suffixes
(Directive, Component) have been dropped.

Here is an example of code before and after the migration:

**Before:**

```ts
import {DisableControlDirectiveModule, AmountFormatModule, InputFilterModule} from '@angular-ru/cdk/directives';
import {MutableTypePipeModule, DeepPathPipeModule} from '@angular-ru/cdk/pipes';

@Component({
  //...
  imports: [
    DisableControlDirectiveModule,
    AmountFormatModule,
    InputFilterModule,
    MutableTypePipeModule,
    DeepPathPipeModule,
  ],
})
export class MyComponent {}
```

**After:**

```ts
import {DisableControl, AmountFormat, InputFilter} from '@angular-ru/cdk/directives';
import {MutableTypePipe, DeepPathPipe} from '@angular-ru/cdk/pipes';

@Component({
  //...
  imports: [DisableControl, AmountFormat, InputFilter, MutableTypePipe, DeepPathPipe],
})
export class MyComponent {}
```

### `FeatureModule.forRoot()` module providers have been replaced with `provideFeature()` environment providers

| **Module provider**                                                                         | **Environment provider**                                         |
| ------------------------------------------------------------------------------------------- | ---------------------------------------------------------------- |
| `InputFilterModule.forRoot()`                                                               | `provideInputFilter()`                                           |
| `AmountFormatModule.forRoot()`                                                              | `provideAmountFormat()`                                          |
| `DataHttpClientModule.forRoot()`                                                            | `provideDataHttpClientOptions()`                                 |
| `DataHttpClientModule.forFeature()`                                                         | `provideDataHttpClientClients()`                                 |
| `ExcelBuilderModule.forRoot()`                                                              | `provideExcelBuilder()`                                          |
| `EXCEL_BUILDER_NGX_TRANSLATE_FALLBACK_PROVIDER`                                             | `provideExcelBuilderNgxTranslateFallback()`                      |
| `LoggerModule.forRoot()`                                                                    | `provideLogger()`                                                |
| `NgxsDataPluginModule.forRoot()`                                                            | `provideNgxsDataPlugin()`                                        |
| `NgxsDataPluginModule.forRoot([NGXS_DATA_STORAGE_EXTENSION, NGXS_DATA_STORAGE_CONTAINER]),` | `provideNgxsDataPlugin(withNgxsDataStorage())`                   |
| `NgxsDataPluginModule.forRoot([MY_FIRST_EXTENSION, MY_SECOND_EXTENSION])`                   | `provideNgxsDataPlugin(MY_FIRST_EXTENSION, MY_SECOND_EXTENSION)` |
| `TooltipModule.forRoot()`                                                                   | `provideTooltip()`                                               |
| `TableBuilderModule.forRoot()`                                                              | `provideVirtualTable()`                                          |
| `DateSuggestionModule.forRoot()`                                                            | `provideDateSuggestion()`                                        |
| `PlainTableComposerModule.forRoot()`                                                        | `providePlainTableComposer()`                                    |
| `TableClipboardModule`                                                                      | `provideTableClipboard()`                                        |
| `WebsocketModule.forRoot()`                                                                 | `provideWebsocket()`                                             |

**Before:**

```ts
export const appConfig: ApplicationConfig = {
  providers: [importProvidersFrom(NgxsDataPluginModule.forRoot())],
};
```

**After:**

```ts
export const appConfig: ApplicationConfig = {
  providers: [provideNgxsDataPlugin()],
};
```

### NGXS Data Plugin Extensions

All ngxs data plugin extensions now have to be environment providers.

**Before:**

```ts
import {NgxsDataExtension} from '@angular-ru/ngxs/typings';

export const MY_FIRST_EXTENSION: NgxsDataExtension = {
  provide: NGXS_PLUGINS,
  useClass: MySuperService,
  multi: true,
};

export const MY_SECOND_EXTENSION: NgxsDataExtension = [
  {
    provide: NGXS_PLUGINS,
    useClass: FeatureService,
    multi: true,
  },
  {
    provide: MyInjectableToken,
    useFactory: (): MyFactory => new MyFactory(),
  },
];

NgxsDataPluginModule.forRoot([MY_FIRST_EXTENSION, MY_SECOND_EXTENSION]);
```

**After:**

```ts
import {makeEnvironmentProviders} from '@angular/core';
import {withNgxsPlugin} from '@ngxs/store';

export const MY_FIRST_EXTENSION = withNgxsPlugin(MySuperService);

export const MY_SECOND_EXTENSION = makeEnvironmentProviders([
  withNgxsPlugin(FeatureService),
  {
    provide: MyInjectableToken,
    useFactory: (): MyFactory => new MyFactory(),
  },
]);

provideNgxsDataPlugin(MY_FIRST_EXTENSION, MY_SECOND_EXTENSION);
```

### Virtual Table changes and deprecations

- `TableBuilderModule.forRoot()` module provider has been replaced by `provideVirtualTable()` environment provider.
- `TableBuilderModule` has been replaced by `VirtualTable` readonly array of standalone component.

**Before:**

```ts
import {TableBuilderModule} from '@angular-ru/cdk/virtual-table';

@Component({
  //...
  imports: [TableBuilderModule],
})
export class MyComponent {}
```

**After:**

```ts
import {VirtualTable} from '@angular-ru/cdk/virtual-table';

@Component({
  //...
  imports: [VirtualTable],
})
export class MyComponent {}
```

- All decorator inputs have been replaced by signal inputs, so, to read an input value in your component, the input has
  to be called as a function.

**Before:**

```ts
export class MyComponent {
  @ViewChild('table')
  table!: TableBuilder<PlainObject>;

  constructor() {
    // "source" was a normal decorated input
    console.log('source:', this.table.source);
  }
}
```

**After:**

```ts
export class MyComponent {
  @ViewChild('table')
  table!: TableBuilder<PlainObject>;

  constructor() {
    // "source" is now a signal input
    console.log('source:', this.table.source());
  }
}
```

- Some deprecated properties, methods and pipes have been removed:
  - `table.selectionEntries` property has been removed. Use `table.selectedKeyList` instead.
  - `tableSelectedItems` pipe has been removed. Use `mapToTableEntries` pipe instead.

  **Before:**

  ```html
  <p>Selected items: {{ (table?.selectionEntries | tableSelectedItems).length }}</p>
  ```

  **After:**

  ```html
  <p>Selected items: {{ (table?.selectedKeyList | mapToTableEntries).length }}</p>
  ```

  - `table.selectedItems` property has been removed. Use `table.getSelectedItems()` method instead.
