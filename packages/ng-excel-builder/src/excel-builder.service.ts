// eslint-disable-next-line max-classes-per-file
import { Injectable } from '@angular/core';
import { toFormatDateTime } from '@angular-ru/common/date';
import { PlainTableComposerService } from '@angular-ru/common/table-utils';
import { Any, EmptyValue, Nullable, PlainObject } from '@angular-ru/common/typings';
import { downloadFile, isNotNil } from '@angular-ru/common/utils';
import { WebWorkerThreadService } from '@angular-ru/common/webworker';

import { ColumnParameters } from './domain/column-parameters';
import { ColumnWidth } from './domain/column-width';
import { ExcelWorkbook } from './domain/excel-workbook';
import { PreparedExcelWorkbook } from './domain/prepared-excel-workbook';
import { PreparedExcelWorksheet } from './domain/prepared-excel-worksheet';

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
                function isEmptyValue(value: Any): value is EmptyValue {
                    const val: Any = typeof value === 'string' ? value.trim() : value;
                    return [undefined, null, NaN, '', Infinity].includes(val);
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

                    private static renderCell(value: Any, styleId: StyleType): string {
                        const type: Any = typeof value === 'number' ? 'Number' : 'String';
                        let cellValue: Any = isEmptyValue(value) ? '-' : value;
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

                        return `
                        <Worksheet ss:Name="${worksheet.worksheetName}">
                            <Table ss:DefaultColumnWidth="${minColumnWidth}" ss:DefaultRowHeight="${rowHeight}">
                                ${xmlColumns}
                                ${xmlBodyRows}
                            </Table>
                        </Worksheet>`;
                    }

                    private generateColumnsDescriptor(worksheet: PreparedExcelWorksheet<T>): string {
                        const { flatEntries, columnParameters, prefixKeyForTranslate }: PreparedExcelWorksheet<T> =
                            worksheet;
                        const keys: string[] = Object.keys(flatEntries?.[0] ?? []);

                        let columnsDescriptor: string = '';
                        let columnCells: string = '';

                        keys.forEach((key: string): void => {
                            const title: string = this.getTranslatedTitle(key, prefixKeyForTranslate);
                            const parameters: Nullable<ColumnParameters> = columnParameters?.[key];
                            const width: number = this.getWidthOfColumn(key, flatEntries, parameters);
                            columnsDescriptor += `<Column ss:Width="${width}" />`;
                            columnCells += ExcelBuilder.renderCell(title, StyleType.HEAD);
                        });
                        return `
                            ${columnsDescriptor}
                            <Row>${columnCells}</Row>`;
                    }

                    private getWidthOfColumn(
                        key: string,
                        entries: PlainObject[],
                        parameters: Nullable<ColumnParameters>
                    ): number {
                        const { minColumnWidth }: StyleSizes = this.sizes;

                        if (parameters?.width === ColumnWidth.MAX_WIDTH) {
                            return this.calcMaxWidthByEntries(entries, key);
                        } else if (typeof parameters?.width === 'number') {
                            return parameters.width;
                        } else {
                            return minColumnWidth;
                        }
                    }

                    private calcMaxWidthByEntries(entries: PlainObject[], key: string): number {
                        const maxLength: number = entries.reduce((length: number, entry: PlainObject): number => {
                            const currentLength: number = (entry[key]?.toString() ?? '').length;
                            return Math.max(currentLength, length);
                        }, 0);
                        return maxLength * this.sizes.fontWidth;
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

                const UTF8: string = '\ufeff';
                return new Blob([UTF8, xmlBookTemplate], { type: 'application/vnd.ms-excel;charset=UTF-8' });
            }, preparedWorkbook)
            .then((blob: Blob): void => ExcelBuilderService.downloadWorkbook(blob, workbook.filename));
    }

    private async prepareWorkbook<T>(workbook: ExcelWorkbook<T>): Promise<PreparedExcelWorkbook<T>> {
        const preparedWorksheets: PreparedExcelWorksheet<T>[] = [];
        for (const worksheet of workbook.worksheets) {
            let flatEntries: PlainObject[] = [];
            if (isNotNil(worksheet.entries)) {
                flatEntries = await this.plainTableComposer.compose(worksheet.entries, {
                    includeKeys: worksheet.keys,
                    excludeKeys: worksheet.excludeKeys
                });
            }
            preparedWorksheets.push({ ...worksheet, flatEntries });
        }

        const preparedTranslatedKeys: PlainObject = workbook.translatedKeys
            ? await this.plainTableComposer.composeSingle<PlainObject>(workbook.translatedKeys)
            : {};
        return { ...workbook, worksheets: preparedWorksheets, preparedTranslatedKeys };
    }
}
