/* eslint-disable */
import { Component, ViewEncapsulation } from '@angular/core';
import { ExcelBuilderService } from '@angular-ru/ng-excel-builder';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    encapsulation: ViewEncapsulation.None
})
export class AppComponent {
    public data: any[] = [
        {
            id: 'id',
            name: 'Maria',
            description: 'Fugiat tempor sunt nostrud ad fugiat. Laboris velit duis incididunt culpa'
        }
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
            translateColumns: {
                // Example by RU
                MODEL_KEY_NAME: {
                    id: 'id',
                    name: 'Имя',
                    description: 'Описание'
                }
            }
        });
    }
}
