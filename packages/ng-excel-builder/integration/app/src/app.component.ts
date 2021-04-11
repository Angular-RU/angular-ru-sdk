import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { Any } from '@angular-ru/common/typings';
import { ExcelService } from '@angular-ru/ng-excel-builder';
import { TranslateService } from '@ngx-translate/core';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,
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
                    titleKey: 'PATH_TO_KEYS',
                    worksheetName: 'worksheet name'
                }
            ],
            translateColumns: {
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
                    titleKey: 'APP_KEYS.MODELS',
                    worksheetName: 'APP_KEYS.WORKSHEET_NAME'
                }
            ]
        });
    }
}
