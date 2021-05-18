/* eslint-disable @typescript-eslint/explicit-function-return-type,max-params-no-constructor/max-params-no-constructor */
import { Injectable } from '@angular/core';
import { toFormatDateTime } from '@angular-ru/common/date';
import { Any, PlainObject } from '@angular-ru/common/typings';
import { downloadFile } from '@angular-ru/common/utils';
import { WebWorkerThreadService } from '@angular-ru/common/webworker';

import { ExcelWorkbook } from './interfaces/excel-workbook';
import { ExcelWorksheet } from './interfaces/excel-worksheet';

interface RulesDescriptor {
    includeKeys?: string[];
    excludeKeys?: string[];
}
interface StyleSizes {
    fontWidth: number;
    fontSize: number;
    columnWidth: number;
    rowHeight: number;
}
@Injectable()
export class ExcelBuilderService {
    constructor(public webWorker: WebWorkerThreadService) {}

    // eslint-disable-next-line max-lines-per-function
    public exportExcelByWorkbook<T>(workbook: ExcelWorkbook<T>): void {
        this.webWorker
            // eslint-disable-next-line sonarjs/cognitive-complexity,max-lines-per-function
            .run((input: ExcelWorkbook<T>): Blob => {
                // eslint-disable-next-line @typescript-eslint/naming-convention
                const StyleType: PlainObject = {
                    HEAD: 'HeadCellStyle',
                    BODY: 'BodyCellStyle',
                    BIG_DATA: 'CellBigDataStyle'
                };

                const xmlWorksheetsTemplate: string = generateWorksheets(
                    input.worksheets,
                    flattenAndCleanObjectKeys(input.translatedKeys),
                    { fontWidth: 5, fontSize: 7, columnWidth: 140, rowHeight: 40 },
                    StyleType
                );

                // eslint-disable-next-line max-lines-per-function
                function generateWorksheets(
                    worksheets: ExcelWorksheet<T>[],
                    flattenTranslatedKeys: PlainObject,
                    sizes: StyleSizes,
                    styleType: PlainObject
                ): string {
                    // eslint-disable-next-line max-lines-per-function
                    const xmlWorksheets: string[] = worksheets.map((worksheet: ExcelWorksheet<T>): string => {
                        const worksheetName: string = worksheet.worksheetName;

                        const entries: PlainObject[] = worksheet.entries.map(
                            (entry: PlainObject): PlainObject =>
                                flattenAndCleanObjectKeys(entry, {
                                    includeKeys: worksheet.keys,
                                    excludeKeys: worksheet.excludeKeys
                                })
                        );

                        const headerTitles: string[] = getTranslatedTitlesByEntry(
                            entries[0],
                            flattenTranslatedKeys,
                            worksheet.prefixKeyForTranslate
                        );

                        const xmlColumnsDescriptor: string = generateColumnsDescriptor(headerTitles, sizes);
                        const xmlHeaderRow: string = generateHeaderRow(headerTitles, styleType);
                        const xmlBodyRows: string = generateBodyRows(entries, sizes, styleType);

                        return `
                          <Worksheet ss:Name="${worksheetName}">
                            <Table ss:DefaultColumnWidth="${sizes.columnWidth}" ss:DefaultRowHeight="${sizes.rowHeight}">
                                ${xmlColumnsDescriptor}
                                ${xmlHeaderRow}
                                ${xmlBodyRows}
                            </Table>
                          </Worksheet>
                        `;
                    });
                    return xmlWorksheets.join('');
                }

                function generateColumnsDescriptor(titles: string[], { fontSize, columnWidth }: StyleSizes): string {
                    const xmlDescriptors: string[] = titles.map((title: string): string => {
                        const textWidth: number = title.length * fontSize;
                        const width: number = Math.max(textWidth, columnWidth);
                        return `<Column ss:Width="${width}" />`;
                    });

                    return xmlDescriptors.join('');
                }

                function getTranslatedTitlesByEntry(entry: Any, dictionary: Any, translatePrefix?: string): string[] {
                    return Object.keys(entry).map((key: string): string => {
                        const translatePath: string = translatePrefix ? `${translatePrefix}.${key}` : key;
                        return dictionary[translatePath] ?? key;
                    });
                }

                function generateHeaderRow(titles: string[], styleType: PlainObject): string {
                    const xmlCells: string = titles.map((title: string) => renderCell(title, styleType.HEAD)).join('');
                    return `<Row>${xmlCells}</Row>`;
                }

                function generateBodyRows(entries: PlainObject[], sizes: StyleSizes, styleType: PlainObject): string {
                    const xmlRows: string[] = entries.map((cell: PlainObject): string => {
                        const xmlCells: string = generateCells(cell, sizes, styleType);
                        return `<Row ss:Height="${sizes.rowHeight}">${xmlCells}</Row>`;
                    });

                    return xmlRows.join();
                }

                function generateCells(flatCell: Any, { fontWidth, columnWidth }: StyleSizes, styleType: Any) {
                    const keys: string[] = Object.keys(flatCell);

                    const xmlCells: string[] = keys.map((key: string): string => {
                        const value: string = flatCell[key];
                        const symbolCount: number = String(value).length;
                        const localStyleId: string =
                            symbolCount * fontWidth >= columnWidth ? styleType['BIG_DATA'] : styleType['BODY'];
                        return renderCell(value, localStyleId);
                    });

                    return xmlCells.join('');
                }

                function renderCell(value: Any, styleId: string, defaultType: string = 'String') {
                    // note: don't use isString here
                    // noinspection SuspiciousTypeOfGuard
                    const type: Any = typeof value === 'number' ? 'Number' : defaultType;
                    let cellValue: Any = fallbackIfEmpty(value, '-');

                    // note: don't use isString here
                    // noinspection SuspiciousTypeOfGuard
                    if (typeof cellValue === 'string') {
                        cellValue = cellValue.trim();
                        cellValue = cellValue.replace(/[<>]/g, '');
                    }
                    return `<Cell ss:StyleID="${styleId}"><Data ss:Type="${type}">${cellValue}</Data></Cell>`;
                }

                function fallbackIfEmpty(value: Any, fallback: Any) {
                    return checkValueIsEmpty(value) ? fallback : value;
                }

                function checkValueIsEmpty(value: Any) {
                    // TODO: need reuse utils in difference workers
                    // noinspection SuspiciousTypeOfGuard
                    const val: Any = typeof value === 'string' ? value.trim() : value;
                    return [undefined, null, NaN, '', 'null', Infinity].includes(val);
                }

                function flattenAndCleanObjectKeys(
                    objectRef: Any,
                    rules?: RulesDescriptor,
                    keyPrefix: string = ''
                ): PlainObject {
                    const depthGraph: PlainObject = {};
                    const keys: string[] = Object.keys(objectRef);
                    keys.forEach((key: string): void => {
                        const path: string = keyPrefix ? `${keyPrefix}.${key}` : key;

                        if (!rules || keyPassesRules(path, rules)) {
                            if (isObject(objectRef[key])) {
                                const childKeys: PlainObject = flattenAndCleanObjectKeys(objectRef[key], rules, path);
                                Object.assign(depthGraph, childKeys);
                            } else {
                                depthGraph[path] = objectRef[key];
                            }
                        }
                    });
                    return depthGraph;
                }

                function isObject(value: Any): value is PlainObject {
                    return typeof value === 'object' && value !== null;
                }

                function keyPassesRules(key: string, { includeKeys, excludeKeys }: RulesDescriptor): boolean {
                    return passesWhitelist(key, includeKeys) && passesBlacklist(key, excludeKeys);
                }

                function passesWhitelist(key: string, whitelist?: string[]): boolean {
                    if (whitelist) {
                        return whitelist.some((path: string): boolean => isPartOfPath(key, path));
                    } else {
                        return true;
                    }
                }

                function passesBlacklist(key: string, blacklist?: string[]): boolean {
                    if (blacklist) {
                        return !blacklist.includes(key);
                    } else {
                        return true;
                    }
                }

                function isPartOfPath(subPath: string, path: string): boolean {
                    return new RegExp(`^${subPath}(\\..+)?$`).test(path);
                }

                function commonStyles(font: string = '<Font ss:Bold="0" ss:FontName="Arial" />') {
                    return `${font}
                        <Borders>
                            <Border ss:Position="Top" ss:Color="#000000" ss:LineStyle="Continuous" ss:Weight="1"/>
                            <Border ss:Position="Bottom" ss:Color="#000000" ss:LineStyle="Continuous" ss:Weight="1"/>
                            <Border ss:Position="Right" ss:Color="#000000" ss:LineStyle="Continuous" ss:Weight="1"/>
                            <Border ss:Position="Left" ss:Color="#000000" ss:LineStyle="Continuous" ss:Weight="1"/>
                        </Borders>`;
                }

                const template: string = `
                          <?xml version="1.0"?>
                          <?mso-application progid="Excel.Sheet"?>
                          <Workbook
                           xmlns="urn:schemas-microsoft-com:office:spreadsheet"
                           xmlns:o="urn:schemas-microsoft-com:office:office"
                           xmlns:x="urn:schemas-microsoft-com:office:excel"
                           xmlns:ss="urn:schemas-microsoft-com:office:spreadsheet"
                           xmlns:html="https://www.w3.org/TR/html40/">
                           <Styles>
                            <Style ss:ID="${StyleType.HEAD}">
                               <Alignment ss:Horizontal="Center" ss:Vertical="Center" ss:WrapText="0" />
                               ${commonStyles('<Font ss:Bold="1" ss:FontName="Arial" />')}
                            </Style>
                            <Style ss:ID="${StyleType.BIG_DATA}">
                               <Alignment ss:Horizontal="Center" ss:Vertical="Center" ss:WrapText="1" />
                               ${commonStyles()}
                            </Style>
                            <Style ss:ID="${StyleType.BODY}">
                              <Alignment ss:Horizontal="Center" ss:Vertical="Center" ss:WrapText="0" />
                              ${commonStyles()}
                            </Style>
                          </Styles>
                           ${xmlWorksheetsTemplate}
                          </Workbook>
                      `;

                const UTF8: string = '\ufeff';
                return new Blob([UTF8, template], { type: 'application/vnd.ms-excel;charset=UTF-8' });
            }, workbook)
            .then((blob: Blob): void =>
                downloadFile({ blob, name: `${workbook.filename}.${toFormatDateTime()}`, extension: 'xls' })
            );
    }
}
