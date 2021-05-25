// eslint-disable-next-line max-classes-per-file
import { Injectable } from '@angular/core';
import { toFormatDateTime } from '@angular-ru/common/date';
import { PlainTableComposerService } from '@angular-ru/common/table-utils';
import { Any, EmptyValue, PlainObject } from '@angular-ru/common/typings';
import { downloadFile } from '@angular-ru/common/utils';
import { WebWorkerThreadService } from '@angular-ru/common/webworker';

import { ExcelWorkbook, PreparedExcelWorkbook } from './interfaces/excel-workbook';
import { PreparedExcelWorksheet } from './interfaces/excel-worksheet';

interface StyleSizes {
    fontWidth: number;
    fontSize: number;
    columnWidth: number;
    rowHeight: number;
}
@Injectable()
export class ExcelBuilderService {
    constructor(public plainTableComposer: PlainTableComposerService, public webWorker: WebWorkerThreadService) {}

    // eslint-disable-next-line max-lines-per-function
    public async exportExcelByWorkbook<T>(workbook: ExcelWorkbook<T>): Promise<void> {
        const preparedWorkbook: PreparedExcelWorkbook<T> = await this.prepareWorkbook(workbook);

        this.webWorker
            // eslint-disable-next-line max-lines-per-function
            .run((input: PreparedExcelWorkbook<T>): Blob => {
                const enum StyleType {
                    HEAD = 'HeadCellStyle',
                    BODY = 'BodyCellStyle',
                    BIG_DATA = 'CellBigDataStyle'
                }

                function isEmptyValue(value: Any): value is EmptyValue {
                    const val: Any = typeof value === 'string' ? value.trim() : value;
                    return [undefined, null, NaN, '', 'null', Infinity].includes(val);
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

                    public buildWorkbook(worksheets: PreparedExcelWorksheet<T>[]): string {
                        const xmlWorksheets: string = this.generateWorksheets(worksheets);
                        return ExcelBuilder.generateWorkbook(xmlWorksheets);
                    }

                    private generateWorksheets(worksheets: PreparedExcelWorksheet<T>[]): string {
                        const xmlSheets: string[] = worksheets.map((worksheet: PreparedExcelWorksheet<T>): string => {
                            const worksheetName: string = worksheet.worksheetName;
                            const translatePrefix: string | undefined = worksheet.prefixKeyForTranslate;
                            const entries: PlainObject[] = worksheet.flatEntries;
                            const titles: string[] = this.getTranslatedTitlesByEntry(entries[0], translatePrefix);

                            return this.generateWorksheet(worksheetName, entries, titles);
                        });
                        return xmlSheets.join('');
                    }

                    private generateWorksheet(worksheetName: string, entries: PlainObject[], titles: string[]): string {
                        const { columnWidth, rowHeight }: StyleSizes = this.sizes;
                        const xmlColumns: string = this.generateColumnsDescriptor(titles);
                        const xmlHeaderRow: string = this.generateHeaderRow(titles);
                        const xmlBodyRows: string = this.generateBodyRows(entries);

                        return `
                        <Worksheet ss:Name="${worksheetName}">
                            <Table ss:DefaultColumnWidth="${columnWidth}" ss:DefaultRowHeight="${rowHeight}">
                                ${xmlColumns}
                                ${xmlHeaderRow}
                                ${xmlBodyRows}
                            </Table>
                        </Worksheet>`;
                    }

                    private generateColumnsDescriptor(titles: string[]): string {
                        const { fontSize, columnWidth }: StyleSizes = this.sizes;
                        const xmlDescriptors: string[] = titles.map((title: string): string => {
                            const textWidth: number = title.length * fontSize;
                            const width: number = Math.max(textWidth, columnWidth);
                            return `<Column ss:Width="${width}" />`;
                        });

                        return xmlDescriptors.join('');
                    }

                    private getTranslatedTitlesByEntry(entry: Any, translatePrefix?: string): string[] {
                        return Object.keys(entry).map((key: string): string => {
                            const translatePath: string = translatePrefix ? `${translatePrefix}.${key}` : key;
                            return this.flattenTranslatedKeys[translatePath] ?? key;
                        });
                    }

                    private generateHeaderRow(titles: string[]): string {
                        const xmlCells: string = titles
                            .map((title: string): string => ExcelBuilder.renderCell(title, StyleType.HEAD))
                            .join('');
                        return `<Row>${xmlCells}</Row>`;
                    }

                    private generateBodyRows(entries: PlainObject[]): string {
                        const { rowHeight }: StyleSizes = this.sizes;
                        const xmlRows: string[] = entries.map((cell: PlainObject): string => {
                            const xmlCells: string = this.generateCells(cell);
                            return `<Row ss:Height="${rowHeight}">${xmlCells}</Row>`;
                        });

                        return xmlRows.join();
                    }

                    private generateCells(flatCell: PlainObject): string {
                        const { fontWidth, columnWidth }: StyleSizes = this.sizes;
                        const keys: string[] = Object.keys(flatCell);

                        const xmlCells: string[] = keys.map((key: string): string => {
                            const value: string = flatCell[key];
                            const symbolCount: number = String(value).length;
                            const overflow: boolean = symbolCount * fontWidth >= columnWidth;
                            const localStyleId: StyleType = overflow ? StyleType.BIG_DATA : StyleType.BODY;
                            return ExcelBuilder.renderCell(value, localStyleId);
                        });

                        return xmlCells.join('');
                    }
                }

                const xmlBookTemplate: string = new ExcelBuilder(
                    { fontWidth: 5, fontSize: 7, columnWidth: 140, rowHeight: 40 },
                    input.preparedTranslatedKeys
                ).buildWorkbook(input.worksheets);

                const UTF8: string = '\ufeff';
                return new Blob([UTF8, xmlBookTemplate], { type: 'application/vnd.ms-excel;charset=UTF-8' });
            }, preparedWorkbook)
            .then((blob: Blob): void =>
                downloadFile({ blob, name: `${workbook.filename}.${toFormatDateTime()}`, extension: 'xls' })
            );
    }

    private async prepareWorkbook<T>(workbook: ExcelWorkbook<T>): Promise<PreparedExcelWorkbook<T>> {
        const preparedWorksheets: PreparedExcelWorksheet<T>[] = [];
        for (const worksheet of workbook.worksheets) {
            const flatEntries: PlainObject[] = await this.plainTableComposer.compose(worksheet.entries, {
                includeKeys: worksheet.keys,
                excludeKeys: worksheet.excludeKeys
            });
            preparedWorksheets.push({ ...worksheet, flatEntries });
        }

        const preparedTranslatedKeys: PlainObject = workbook.translatedKeys
            ? await this.plainTableComposer.composeSingle<PlainObject>(workbook.translatedKeys)
            : {};
        return { ...workbook, worksheets: preparedWorksheets, preparedTranslatedKeys };
    }
}
