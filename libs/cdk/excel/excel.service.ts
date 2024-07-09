import {Inject, Injectable} from '@angular/core';
import {exclude} from '@angular-ru/cdk/array';
import {Nullable, PlainObject} from '@angular-ru/cdk/typings';
import {Observable, of} from 'rxjs';

import {EntriesKeys} from './domain/entries-keys';
import {ExcelBuilderTextColumnInterceptor} from './domain/excel-builder-text-column-interceptor';
import {ExcelWorkbook} from './domain/excel-workbook';
import {ExcelWorksheet} from './domain/excel-worksheet';
import {ExcelBuilderService} from './excel-builder.service';
import {EXCEL_BUILDER_INTERCEPTOR_TOKEN} from './excel-interceptor-text.token';

@Injectable()
export class ExcelService {
    constructor(
        @Inject(EXCEL_BUILDER_INTERCEPTOR_TOKEN)
        private readonly interceptor: ExcelBuilderTextColumnInterceptor,
        private readonly builder: ExcelBuilderService,
    ) {}

    public exportExcel<T>(workbook: Partial<ExcelWorkbook<T>>): void {
        this.getTranslatedColumn()
            // eslint-disable-next-line rxjs/no-topromise, deprecation/deprecation
            .toPromise()
            .then(async (translatedKeys: Nullable<PlainObject>): Promise<void> => {
                await this.builder.exportExcelByWorkbook({
                    filename: this.interceptFilename<T>(workbook),
                    worksheets: this.interceptWorksheets<T>(workbook),
                    translatedKeys: translatedKeys ?? workbook.translatedKeys ?? {},
                });
            });
    }

    private interceptFilename<T>(workbook: Partial<ExcelWorkbook<T>>): string {
        return (
            this.interceptor.instant?.(workbook.filename) ??
            workbook.filename ??
            'UNKNOWN FILENAME'
        );
    }

    private interceptWorksheets<T>(
        workbook: Partial<ExcelWorkbook<T>>,
    ): ExcelWorksheet<T>[] {
        return (workbook.worksheets ?? []).map(
            (worksheet: ExcelWorksheet<T>): ExcelWorksheet<T> => {
                const worksheetName: string =
                    this.interceptor?.instant?.(worksheet.worksheetName) ??
                    worksheet.worksheetName ??
                    'UNKNOWN WORKSHEET NAME';

                const keys: EntriesKeys<T> = worksheet.keys?.filter(
                    exclude(worksheet.excludeKeys ?? []),
                ) as EntriesKeys<T>;

                return {...worksheet, keys, worksheetName};
            },
        );
    }

    private getTranslatedColumn(): Observable<Nullable<PlainObject>> {
        return this.interceptor?.getTranslationMap?.() ?? of(null);
    }
}
