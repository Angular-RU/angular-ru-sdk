import { Any, PlainObject, PlainObjectOf } from '@angular-ru/common/typings';
import { DatePipe } from '@angular/common';

const DATE_CONFIG: PlainObject = {
    locale: 'en-US',
    format: 'dd.MM.yyyy HH:mm:ss'
};

export interface ExcelWorkbook<T = Any> {
    filename: string;
    worksheets: ExcelWorksheet<T>[];
    translateColumns: PlainObject;
}

export interface ExcelWorksheet<T = Any> {
    table: PlainObjectOf<T>[];
    worksheetName: string;
    titleKey: string;
    excludeKeys?: string[];
}

export class SerialDate {
    public static formatDateTime(time?: number, format?: string): string | null {
        const timeValue: number = time || new Date().getTime();
        const formatValue: string = format || DATE_CONFIG.format;
        return new DatePipe(DATE_CONFIG.locale).transform(timeValue, formatValue);
    }
}
