# Excel Builder

> Small library for generate xls files via Webworker

```typescript
import { ExcelBuilderModule } from '@angular-ru/ng-excel-builder';
...

@NgModule({
    imports: [
        ExcelBuilderModule.forRoot(),

    ],
    ...
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

## Example

```typescript
import { ExcelBuilderService, ObjectKeyMap } from '@angular-ru/ng-excel-builder';

@Component({ .. })
export class AppComponent {
    public data: ObjectKeyMap[] = [
      {
        id: 'id',
        name: 'Maria',
        description: 'Fugiat tempor sunt nostrud ad fugiat. Laboris velit duis incididunt culpa',
        ...
      },
      {...}
    ];

    constructor(protected excel: ExcelBuilderService) {}

    public exportExcel(): void {
        this.excel.exportExcelByWorkbook({
            filename: 'TITLE',
            worksheets: [
                {
                    titleKey: 'MODEL_KEY_NAME',
                    worksheetName: 'worksheet name',
                    table: this.data
                }
            ],
            translateColumns: {  // Example by RU
               MODEL_KEY_NAME: {
                    id: 'id',
                    name: 'Имя',
                    description: 'Описание'
               }
            }
        });
    }
}
```

<div>
<ul>
 <li>"filename" - the generated file will be named like this. 
 <li>"worksheets" - array of objects with your data. 
 <ul>
  <li>titleKey will be used in translate function.
  <li>worksheetName - name of the sheet.
  <li>table is arraay of objects, which contains data for sheet. 
 </ul>
 <li>"translateColumns" - it's a dictionary for you column headers, you can leave it empty and then the column keys will be generated as is.
 </ul>
</div>
