/* eslint-disable unicorn/consistent-function-scoping */
// eslint-disable-next-line max-classes-per-file
import { Injectable } from '@angular/core';
import { toFormatDateTime } from '@angular-ru/cdk/date';
import { PlainTableComposerService } from '@angular-ru/cdk/table-utils';
import { EmptyValue, Nullable, PlainObject } from '@angular-ru/cdk/typings';
import { downloadFile, isNotNil } from '@angular-ru/cdk/utils';
import { WebWorkerThreadService } from '@angular-ru/cdk/webworker';

import { ColumnParameters } from './domain/column-parameters';
import { ColumnWidth } from './domain/column-width';
import { ExcelWorkbook } from './domain/excel-workbook';
import { ExcelWorksheet } from './domain/excel-worksheet';
import { PreparedExcelWorkbook, WidthOfSymbols } from './domain/prepared-excel-workbook';
import { PreparedExcelWorksheet } from './domain/prepared-excel-worksheet';
import widthOfSymbolsMap from './domain/width-of-symbols-map.json';

interface StyleSizes {
    fontWidth: number;
    fontSize: number;
    minColumnWidth: number;
    rowHeight: number;
}

const enum StyleType {
    HEAD = 'HeadCellStyle',
    BODY = 'BodyCellStyle',
    BIG_DATA = 'CellBigDataStyle'
}

@Injectable()
export class ExcelBuilderService {
    constructor(public plainTableComposer: PlainTableComposerService, public webWorker: WebWorkerThreadService) {}

    private static downloadWorkbook(blob: Blob, workbookName: string): void {
        downloadFile({ blob, name: `${workbookName}.${toFormatDateTime()}`, extension: 'xls' });
    }

    // eslint-disable-next-line max-lines-per-function
    public async exportExcelByWorkbook<T>(workbook: ExcelWorkbook<T>): Promise<void> {
        const preparedWorkbook: PreparedExcelWorkbook<T> = await this.prepareWorkbook(workbook);

        this.webWorker
            // eslint-disable-next-line max-lines-per-function,sonarjs/cognitive-complexity
            .run((input: PreparedExcelWorkbook<T>): Blob => {
                function isEmptyValue(value: any): value is EmptyValue {
                    const nextValue: any = typeof value === 'string' ? value.trim() : value;

                    return [undefined, null, NaN, '', Infinity].includes(nextValue);
                }

                class ExcelBuilder {
                    private static commonBorderStyles: string = `
                        <Borders>
                            <Border ss:Position="Top" ss:Color="#000000" ss:LineStyle="Continuous" ss:Weight="1"/>
                            <Border ss:Position="Bottom" ss:Color="#000000" ss:LineStyle="Continuous" ss:Weight="1"/>
                            <Border ss:Position="Right" ss:Color="#000000" ss:LineStyle="Continuous" ss:Weight="1"/>
                            <Border ss:Position="Left" ss:Color="#000000" ss:LineStyle="Continuous" ss:Weight="1"/>
                        </Borders>`;

                    private static commonStyles: string = `
                        <Styles>
                            <Style ss:ID="${StyleType.HEAD}">
                                <Alignment ss:Horizontal="Center" ss:Vertical="Center" ss:WrapText="0" />
                                <Font ss:Bold="1" ss:FontName="Arial" />
                                ${ExcelBuilder.commonBorderStyles}
                            </Style>
                            <Style ss:ID="${StyleType.BIG_DATA}">
                                <Alignment ss:Horizontal="Center" ss:Vertical="Center" ss:WrapText="1" />
                                <Font ss:Bold="0" ss:FontName="Arial" />
                                ${ExcelBuilder.commonBorderStyles}
                            </Style>
                            <Style ss:ID="${StyleType.BODY}">
                                <Alignment ss:Horizontal="Center" ss:Vertical="Center" ss:WrapText="0" />
                                <Font ss:Bold="0" ss:FontName="Arial" />
                                ${ExcelBuilder.commonBorderStyles}
                            </Style>
                        </Styles>`;

                    constructor(
                        private readonly sizes: StyleSizes,
                        private readonly flattenTranslatedKeys: PlainObject
                    ) {}

                    private static generateWorkbook(xmlWorksheets: string): string {
                        return `
                            <?xml version="1.0"?>
                            <?mso-application progid="Excel.Sheet"?>
                            <Workbook
                                xmlns="urn:schemas-microsoft-com:office:spreadsheet"
                                xmlns:o="urn:schemas-microsoft-com:office:office"
                                xmlns:x="urn:schemas-microsoft-com:office:excel"
                                xmlns:ss="urn:schemas-microsoft-com:office:spreadsheet"
                                xmlns:html="https://www.w3.org/TR/html40/"
                            >
                                ${ExcelBuilder.commonStyles}
                                ${xmlWorksheets}
                            </Workbook>`;
                    }

                    private static renderCell(value: any, styleId: StyleType): string {
                        const type: any = typeof value === 'number' ? 'Number' : 'String';
                        let cellValue: any = isEmptyValue(value) ? '-' : value;

                        if (typeof cellValue === 'string') {
                            cellValue = cellValue.trim();
                            cellValue = cellValue.replace(/[<>]/g, '');
                        }

                        return `<Cell ss:StyleID="${styleId}"><Data ss:Type="${type}">${cellValue}</Data></Cell>`;
                    }

                    private static isFilled(value: Nullable<string>): value is string {
                        return typeof value === 'string' && value.length > 0;
                    }

                    public buildWorkbook(worksheets: PreparedExcelWorksheet<T>[]): string {
                        const xmlWorksheets: string = this.generateWorksheets(worksheets);

                        return ExcelBuilder.generateWorkbook(xmlWorksheets);
                    }

                    private generateWorksheets(worksheets: PreparedExcelWorksheet<T>[]): string {
                        const xmlSheets: string[] = worksheets.map((worksheet: PreparedExcelWorksheet<T>): string =>
                            this.generateWorksheet(worksheet)
                        );

                        return xmlSheets.join('');
                    }

                    private generateWorksheet(worksheet: PreparedExcelWorksheet<T>): string {
                        const { minColumnWidth, rowHeight }: StyleSizes = this.sizes;
                        const xmlColumns: string = this.generateColumnsDescriptor(worksheet);
                        const xmlBodyRows: string = this.generateBodyRows(worksheet.flatEntries);

                        const MAX_WORKSHEET_NAME_LENGTH: number = 31;
                        const DEFAULT_WORKSHEET_NAME: string = 'Table';
                        let worksheetName: string =
                            worksheet.worksheetName?.match(/[\p{Alpha}\p{Nd}]+/gu)?.join(' ') ?? DEFAULT_WORKSHEET_NAME;

                        if (worksheetName.length > MAX_WORKSHEET_NAME_LENGTH) {
                            worksheetName = worksheetName.replace(/\s/g, '').slice(0, MAX_WORKSHEET_NAME_LENGTH);
                        }

                        return `
                        <Worksheet ss:Name="${worksheetName}">
                            <Table ss:DefaultColumnWidth="${minColumnWidth}" ss:DefaultRowHeight="${rowHeight}">
                                ${xmlColumns}
                                ${xmlBodyRows}
                            </Table>
                        </Worksheet>`;
                    }

                    private generateColumnsDescriptor(worksheet: PreparedExcelWorksheet<T>): string {
                        const keys: string[] = Object.keys(worksheet.flatEntries?.[0] ?? []);

                        let columnsDescriptor: string = '';
                        let columnCells: string = '';

                        for (const key of keys) {
                            const title: string = this.getTranslatedTitle(key, worksheet.prefixKeyForTranslate);
                            const parameters: Nullable<ColumnParameters> = worksheet.columnParameters?.[key];
                            const entriesColumn: string[] = worksheet.flatEntries.map(
                                (entry: PlainObject): string => entry[key]?.toString() ?? ''
                            );
                            const widthSetting: Nullable<number | ColumnWidth> =
                                parameters?.width ?? worksheet.generalColumnParameters?.width;
                            const width: number = this.getWidthOfColumn(title, entriesColumn, widthSetting);

                            columnsDescriptor += `<Column ss:Width="${width}" />`;
                            columnCells += ExcelBuilder.renderCell(title, StyleType.HEAD);
                        }

                        return `
                            ${columnsDescriptor}
                            <Row>${columnCells}</Row>`;
                    }

                    private getWidthOfColumn(
                        title: string,
                        entries: string[],
                        width: Nullable<number | ColumnWidth>
                    ): number {
                        const { minColumnWidth }: StyleSizes = this.sizes;

                        if (width === ColumnWidth.MAX_WIDTH) {
                            return this.calcMaxWidthByEntries(entries, title);
                        } else if (typeof width === 'number') {
                            return width;
                        } else {
                            return minColumnWidth;
                        }
                    }

                    private calcMaxWidthByEntries(entries: string[], title: string): number {
                        const titleLength: number = this.getWidthOfString(title, 'bold');
                        const indentMeasuredInSymbols: number = 2;
                        const indent: number = this.sizes.fontWidth * indentMeasuredInSymbols;
                        const maxLength: number = entries.reduce((length: number, entry: string): number => {
                            const currentLength: number = this.getWidthOfString(entry, 'regular');

                            return Math.max(currentLength, length);
                        }, titleLength);

                        return Math.round(maxLength) + indent;
                    }

                    private getWidthOfString(string: string, fontWeight: keyof WidthOfSymbols): number {
                        let width: number = 0;

                        for (const symbol of string) {
                            width += input.widthOfSymbols[fontWeight][symbol] ?? this.sizes.fontWidth;
                        }

                        return width;
                    }

                    private getTranslatedTitle(key: string, translatePrefix?: Nullable<string>): string {
                        const translatePath: string = ExcelBuilder.isFilled(translatePrefix)
                            ? `${translatePrefix}.${key}`
                            : key;

                        return this.flattenTranslatedKeys[translatePath] ?? key;
                    }

                    private generateBodyRows(entries: PlainObject[]): string {
                        const { rowHeight }: StyleSizes = this.sizes;
                        const xmlRows: string[] = entries.map((cell: PlainObject): string => {
                            const xmlCells: string = this.generateCells(cell);

                            return `<Row ss:Height="${rowHeight}">${xmlCells}</Row>`;
                        });

                        return xmlRows.join('');
                    }

                    private generateCells(flatCell: PlainObject): string {
                        const { fontWidth, minColumnWidth }: StyleSizes = this.sizes;
                        const keys: string[] = Object.keys(flatCell);

                        const xmlCells: string[] = keys.map((key: string): string => {
                            const value: string = flatCell[key];
                            const symbolCount: number = String(value).length;
                            const overflow: boolean = symbolCount * fontWidth >= minColumnWidth;
                            const localStyleId: StyleType = overflow ? StyleType.BIG_DATA : StyleType.BODY;

                            return ExcelBuilder.renderCell(value, localStyleId);
                        });

                        return xmlCells.join('');
                    }
                }

                const xmlBookTemplate: string = new ExcelBuilder(
                    { fontWidth: 6, fontSize: 7, minColumnWidth: 150, rowHeight: 40 },
                    input.preparedTranslatedKeys
                ).buildWorkbook(input.worksheets);

                const UTF8: string = '\uFEFF';

                return new Blob([UTF8, xmlBookTemplate], { type: 'application/vnd.ms-excel;charset=UTF-8' });
            }, preparedWorkbook)
            .then((blob: Blob): void => ExcelBuilderService.downloadWorkbook(blob, workbook.filename));
    }

    private async prepareWorkbook<T>(workbook: ExcelWorkbook<T>): Promise<PreparedExcelWorkbook<T>> {
        const preparedWorksheets: PreparedExcelWorksheet<T>[] = await Promise.all(
            workbook.worksheets.map(
                async (worksheet: ExcelWorksheet<T>): Promise<PreparedExcelWorksheet<T>> =>
                    await this.prepareWorksheet(worksheet)
            )
        );

        const preparedTranslatedKeys: PlainObject = workbook.translatedKeys
            ? await this.plainTableComposer.composeSingle<PlainObject>(workbook.translatedKeys)
            : {};

        return {
            ...workbook,
            worksheets: preparedWorksheets,
            preparedTranslatedKeys,
            widthOfSymbols: widthOfSymbolsMap
        };
    }

    private async prepareWorksheet<T>(worksheet: ExcelWorksheet<T>): Promise<PreparedExcelWorksheet<T>> {
        let flatEntries: PlainObject[] = [];

        if (isNotNil(worksheet.entries)) {
            flatEntries = await this.plainTableComposer.compose(worksheet.entries, {
                includeKeys: worksheet.keys,
                excludeKeys: worksheet.excludeKeys
            });
        }

        return { ...worksheet, flatEntries };
    }
}
