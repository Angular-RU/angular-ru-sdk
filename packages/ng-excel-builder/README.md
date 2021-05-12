# Excel Builder

> Small library for generate xls files via web worker

```ts
import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { ExcelBuilderModule } from '@angular-ru/ng-excel-builder';

@NgModule({
    imports: [TranslateModule.forRoot(), ExcelBuilderModule.forRoot()]
})
export class AppModule {}
```

## About

<div>
This builder we made for simple and fast generation xls files on client-side. It works with small & medium data size. Files wil open only in Microsoft Excel(!).
Google Spreadsheets, LibreOffice and another programs are not supported.
</div>

## Install

```
$ npm install @angular-ru/ng-excel-builder --save
```

## Example with NGX Translate

```ts
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { EXCEL_BUILDER_NGX_TRANSLATE_FALLBACK_PROVIDER, ExcelBuilderModule } from '@angular-ru/ng-excel-builder';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { AppComponent } from './app.component';

// ts-prune-ignore-next
export function createTranslateLoader(http: HttpClient): TranslateHttpLoader {
    return new TranslateHttpLoader(http, './assets/i18n/', `.json`);
}

@NgModule({
    bootstrap: [AppComponent],
    declarations: [AppComponent],
    imports: [
        BrowserModule,
        MatListModule,
        HttpClientModule,
        MatToolbarModule,
        MatSidenavModule,
        MatButtonModule,
        BrowserAnimationsModule,
        TranslateModule.forRoot({
            loader: {
                deps: [HttpClient],
                provide: TranslateLoader,
                useFactory: createTranslateLoader
            }
        }),
        RouterModule.forRoot([]),
        ExcelBuilderModule.forRoot()
    ],
    providers: [EXCEL_BUILDER_NGX_TRANSLATE_FALLBACK_PROVIDER]
})
export class AppModule {}
```

when we have `ru.json`

```json
{
    "APP_KEYS": {
        "TITLE": "Название файла",
        "WORKSHEET_NAME": "Лист 1",
        "MODELS": {
            "id": "id",
            "name": "Имя",
            "description": "Описание"
        }
    }
}
```

```ts
@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    encapsulation: ViewEncapsulation.None
})
export class AppComponent {
    public data: Any[] = [
        {
            id: 'id',
            name: 'Maria',
            description: 'Fugiat tempor sunt nostrud ad fugiat. Laboris velit duis incididunt culpa'
        }
    ];

    constructor(protected excel: ExcelService, private readonly translate: TranslateService) {
        this.translate.setDefaultLang('ru');
    }

    public exportExcel(): void {
        this.excel.exportExcel({
            filename: 'My excel file',
            worksheets: [
                {
                    table: this.data,
                    prefixKeyForTranslate: 'PATH_TO_KEYS',
                    worksheetName: 'worksheet name'
                }
            ],
            translatedKeys: {
                PATH_TO_KEYS: {
                    id: 'ID',
                    name: 'Name',
                    description: 'Description'
                }
            }
        });
    }

    public exportExcelWithI18n(): void {
        this.excel.exportExcel({
            filename: 'APP_KEYS.TITLE',
            worksheets: [
                {
                    table: this.data,
                    prefixKeyForTranslate: 'APP_KEYS.MODELS',
                    worksheetName: 'APP_KEYS.WORKSHEET_NAME'
                }
            ]
        });
    }
}
```

-   `filename` - the generated file will be named like this.
-   `worksheets` - array of objects with your data.

    -   `prefixKeyForTranslate` will be used in translate function.
    -   `worksheetName` - name of the sheet.
    -   `entries` is an array of objects, which contains data for a sheet.

-   `translatedKeys` - it's a dictionary for you column headers, you can leave it empty and then the column keys will be
    generated as is.

### Custom translate service

```ts
import { Injectable } from '@angular/core';

@Injectable()
class MyCustomTranslateService implements ExcelBuilderTextColumnInterceptor {
    // ...
}

@NgModule({
    // ...
    providers: [
        {
            provide: EXCEL_BUILDER_INTERCEPTOR_TOKEN,
            useClass: MyCustomTranslateService
        }
    ]
})
export class AppModule {}
```
