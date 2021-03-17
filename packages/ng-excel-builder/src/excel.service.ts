import { Inject, Injectable } from '@angular/core';
import { PlainObject } from '@angular-ru/common/typings';
import { Observable, of } from 'rxjs';

import { ExcelBuilderTextColumnInterceptor, ExcelWorkbook, ExcelWorksheet } from './excel-builder.interfaces';
import { ExcelBuilderService } from './excel-builder.service';
import { EXCEL_BUILDER_INTERCEPTOR_TOKEN } from './excel-interceptor-text.token';

@Injectable()
export class ExcelService {
    constructor(
        @Inject(EXCEL_BUILDER_INTERCEPTOR_TOKEN)
        private readonly interceptor: ExcelBuilderTextColumnInterceptor,
        private readonly builder: ExcelBuilderService
    ) {}

    public exportExcel(workbook: Partial<ExcelWorkbook>): void {
        this.getTranslatedColumn()
            .toPromise()
            .then((translateColumns: PlainObject | null): void => {
                this.builder.exportExcelByWorkbook({
                    filename: this.interceptFilename(workbook),
                    worksheets: this.interceptWorksheets(workbook),
                    translateColumns: translateColumns ?? workbook.translateColumns ?? {}
                });
            });
    }

    private interceptFilename(workbook: Partial<ExcelWorkbook>): string {
        return this.interceptor.instant?.(workbook.filename) ?? workbook.filename ?? 'UNKNOWN FILENAME';
    }

    private interceptWorksheets(workbook: Partial<ExcelWorkbook>): ExcelWorksheet[] {
        return (workbook.worksheets ?? []).map(
            (worksheet: ExcelWorksheet): ExcelWorksheet => ({
                ...worksheet,
                worksheetName:
                    this.interceptor?.instant?.(worksheet.worksheetName) ??
                    worksheet.worksheetName ??
                    'UNKNOWN WORKSHEET NAME'
            })
        );
    }

    private getTranslatedColumn(): Observable<PlainObject | null> {
        return this.interceptor?.getTranslatedColumn?.() ?? of(null);
    }
}
