import { Any } from '@angular-ru/common/typings';
import { ExcelService } from '@angular-ru/ng-excel-builder';
import { Component, ViewEncapsulation } from '@angular/core';

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

    constructor(protected excel: ExcelService) {}

    public exportExcel(): void {
        this.excel.exportExcel({
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
                    // eslint-disable-next-line no-cyrillic-string/no-cyrillic-string
                    name: 'Имя',
                    // eslint-disable-next-line no-cyrillic-string/no-cyrillic-string
                    description: 'Описание'
                }
            }
        });
    }
}
