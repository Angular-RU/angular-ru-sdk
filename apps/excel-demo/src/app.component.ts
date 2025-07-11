import {ChangeDetectionStrategy, Component, ViewEncapsulation} from '@angular/core';
import {MatButton} from '@angular/material/button';
import {MatDivider, MatList, MatListItem} from '@angular/material/list';
import {MatDrawer, MatDrawerContainer, MatDrawerContent} from '@angular/material/sidenav';
import {MatToolbar} from '@angular/material/toolbar';
import {RouterLink} from '@angular/router';
import {ExcelService} from '@angular-ru/cdk/excel';
import {TranslateService} from '@ngx-translate/core';

interface A {
    id: string;
    name: string;
    info: {value: number; other: number};
    description: string;
    excluded: string;
}

@Component({
    selector: 'app-root',
    imports: [
        MatButton,
        MatDivider,
        MatDrawer,
        MatDrawerContainer,
        MatDrawerContent,
        MatList,
        MatListItem,
        MatToolbar,
        RouterLink,
    ],
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
    public data: A[] = [
        {
            id: 'id',
            name: 'Maria',
            info: {value: 1, other: 2},
            excluded: 'excluded',
            description:
                'Fugiat tempor sunt nostrud ad fugiat. Laboris velit duis incididunt culpa',
        },
    ];

    constructor(
        protected excel: ExcelService,
        private readonly translate: TranslateService,
    ) {
        this.translate.setDefaultLang('ru');
    }

    public exportExcel(): void {
        this.excel.exportExcel({
            filename: 'My excel file',
            worksheets: [
                {
                    entries: this.data,
                    worksheetName: 'worksheet name',
                    excludeKeys: ['excluded'],
                },
            ],
        });
    }

    public exportExcelWithI18n(): void {
        this.excel.exportExcel({
            filename: 'APP_KEYS.TITLE',
            worksheets: [
                {
                    entries: this.data,
                    prefixKeyForTranslate: 'APP_KEYS.MODELS',
                    worksheetName: 'APP_KEYS.WORKSHEET_NAME',
                    keys: ['info.value', 'description', 'name'],
                    excludeKeys: ['description'],
                },
            ],
        });
    }
}
