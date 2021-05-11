import { Inject, Injectable } from '@angular/core';
import { Leaves, PlainObject } from '@angular-ru/common/typings';
import { Observable, of } from 'rxjs';

import { ExcelBuilderService } from './excel-builder.service';
import { EXCEL_BUILDER_INTERCEPTOR_TOKEN } from './excel-interceptor-text.token';
import { EntriesKeys } from './interfaces/entries-keys';
import { ExcelBuilderTextColumnInterceptor } from './interfaces/excel-builder-text-column-interceptor';
import { KeyDeepSize } from './interfaces/excel-key-deep-size';
import { ExcelWorkbook } from './interfaces/excel-workbook';
import { ExcelWorksheet } from './interfaces/excel-worksheet';

@Injectable()
export class ExcelService {
    constructor(
        @Inject(EXCEL_BUILDER_INTERCEPTOR_TOKEN)
        private readonly interceptor: ExcelBuilderTextColumnInterceptor,
        private readonly builder: ExcelBuilderService
    ) {}

    public exportExcel<T>(workbook: Partial<ExcelWorkbook<T>>): void {
        this.getTranslatedColumn()
            .toPromise()
            .then((translatedKeys: PlainObject | null): void => {
                this.builder.exportExcelByWorkbook({
                    filename: this.interceptFilename<T>(workbook),
                    worksheets: this.interceptWorksheets<T>(workbook),
                    translatedKeys: translatedKeys ?? workbook.translatedKeys ?? {}
                });
            });
    }

    private interceptFilename<T>(workbook: Partial<ExcelWorkbook<T>>): string {
        return this.interceptor.instant?.(workbook.filename) ?? workbook.filename ?? 'UNKNOWN FILENAME';
    }

    private interceptWorksheets<T>(workbook: Partial<ExcelWorkbook<T>>): ExcelWorksheet<T>[] {
        return (workbook.worksheets ?? []).map((worksheet: ExcelWorksheet<T>): ExcelWorksheet<T> => {
            const worksheetName: string =
                this.interceptor?.instant?.(worksheet.worksheetName) ??
                worksheet.worksheetName ??
                'UNKNOWN WORKSHEET NAME';

            const keys: EntriesKeys<T> = worksheet.keys?.filter(
                (key: Leaves<T, KeyDeepSize>): boolean => !(worksheet.excludeKeys?.includes(key) ?? false)
            ) as EntriesKeys<T>;

            return { ...worksheet, keys, worksheetName };
        });
    }

    private getTranslatedColumn(): Observable<PlainObject | null> {
        return this.interceptor?.getTranslatedColumn?.() ?? of(null);
    }
}
