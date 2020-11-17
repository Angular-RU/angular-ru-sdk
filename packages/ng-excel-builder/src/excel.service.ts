import { Injectable } from '@angular/core';
import { PlainObject } from '@angular-ru/common/typings';
import { TranslateService } from '@ngx-translate/core';

import { ExcelBuilderService } from './excel-builder.service';
import { ExcelWorkbook } from './symbols';

@Injectable()
export class ExcelService {
    constructor(private readonly translate: TranslateService, private readonly builder: ExcelBuilderService) {}

    public exportExcel(workbook: Partial<ExcelWorkbook>): void {
        this.translate
            .getTranslation(this.translate.currentLang)
            .toPromise()
            .then((translateColumns: PlainObject): void => {
                const excelWorkbook: ExcelWorkbook = { ...workbook, translateColumns } as ExcelWorkbook;
                this.builder.exportExcelByWorkbook(excelWorkbook);
            });
    }
}
