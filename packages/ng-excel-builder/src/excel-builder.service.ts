/* eslint-disable @typescript-eslint/explicit-function-return-type,max-params-no-constructor/max-params-no-constructor */
import { Injectable } from '@angular/core';
import { toFormatDateTime } from '@angular-ru/common/date';
import { Any, PlainObject } from '@angular-ru/common/typings';
import { downloadFile } from '@angular-ru/common/utils';
import { WebWorkerThreadService } from '@angular-ru/common/webworker';

import { ExcelWorkbook } from './interfaces/excel-workbook';
import { ExcelWorksheet } from './interfaces/excel-worksheet';

@Injectable()
export class ExcelBuilderService {
    constructor(public webWorker: WebWorkerThreadService) {}

    // eslint-disable-next-line max-lines-per-function
    public exportExcelByWorkbook<T>(workbook: ExcelWorkbook<T>): void {
        this.webWorker
            // eslint-disable-next-line sonarjs/cognitive-complexity,max-lines-per-function
            .run((input: ExcelWorkbook<T>): Blob => {
                const PT_WIDTH: number = 5;
                const PT_SIZE: number = 7;
                const COL_WIDTH: number = 140;
                const ROW_HEIGHT: number = 40;

                // eslint-disable-next-line @typescript-eslint/naming-convention
                const StyleType: PlainObject = {
                    HEAD: 'HeadCellStyle',
                    BODY: 'BodyCellStyle',
                    BIG_DATA: 'CellBigDataStyle'
                };

                const worksheetsTemplates: string = generateWorksheet(
                    input.worksheets,
                    flatten(input.translatedKeys),
                    PT_WIDTH,
                    PT_SIZE,
                    COL_WIDTH,
                    ROW_HEIGHT,
                    StyleType
                );

                // eslint-disable-next-line max-lines-per-function
                function generateWorksheet(
                    worksheets: ExcelWorksheet<T>[],
                    flattenTranslatedKeys: PlainObject,
                    ptWidth: number,
                    ptSize: number,
                    colWidth: number,
                    rowHeight: number,
                    styleType: PlainObject
                ): string {
                    let worksheetTemplates: string = '';

                    // eslint-disable-next-line max-lines-per-function
                    worksheets.forEach((worksheet: ExcelWorksheet<T>): void => {
                        const worksheetName: string = worksheet.worksheetName;
                        const entries: T[] = worksheet.entries || [];

                        const headerTitles: string[] = getHeaderTitles(worksheet, entries[0], flattenTranslatedKeys);
                        worksheetTemplates += `
                          <Worksheet ss:Name="${worksheetName}"><Table ss:DefaultColumnWidth="${colWidth}" ss:DefaultRowHeight="${ROW_HEIGHT}">${generateColumns(
                            headerTitles,
                            ptSize,
                            colWidth
                        )}
                              ${generateRow(worksheet, entries, headerTitles, rowHeight, ptWidth, colWidth, styleType)}
                            </Table> </Worksheet>
                          `;
                    });
                    return worksheetTemplates;
                }

                function generateColumns(headerTitles: string[], ptSize: number, colWidth: number) {
                    return headerTitles.reduce((columnTemplate: string, title: string): string => {
                        let templates: string = columnTemplate;
                        const size: number = title.length * ptSize;
                        const width: number = size > colWidth ? size : colWidth;
                        templates += `<Column ss:Width="${width}" />`;
                        return templates;
                    }, '');
                }

                // eslint-disable-next-line max-lines-per-function
                function generateRow(
                    worksheet: ExcelWorksheet<T>,
                    entries: T[],
                    titles: string[],
                    rowHeight: number,
                    ptWidth: number,
                    colWidth: number,
                    styleType: PlainObject
                ) {
                    let rowsTemplates: string = '';
                    entries.forEach((cell: Any, index: Any): void => {
                        const header: string =
                            index === 0 ? `\t<Row>${generateHeadCell(titles, styleType)}\t</Row>` : '';
                        rowsTemplates += `${header}<Row ss:Height="${rowHeight}"> ${generateCell(
                            worksheet,
                            cell,
                            ptWidth,
                            colWidth,
                            styleType
                        )}  </Row>
                                         `;
                    });
                    return rowsTemplates;
                }

                function generateCell(
                    worksheet: ExcelWorksheet<T>,
                    cell: Any,
                    ptWidth: number,
                    colWidth: number,
                    styleType: Any
                ) {
                    const flatCell: PlainObject = flatten(cell, worksheet.excludeKeys);
                    return generateBodyCell(worksheet, flatCell, ptWidth, colWidth, styleType);
                }

                function generateBodyCell(
                    worksheet: ExcelWorksheet<T>,
                    flatCell: Any,
                    ptWidth: Any,
                    colWidth: Any,
                    styleType: Any
                ) {
                    let bodyCellTemplate: string = '';
                    const keys: string[] =
                        typeof worksheet.keys?.length === 'number' ? worksheet.keys : Object.keys(flatCell);

                    keys.forEach((key: string): void => {
                        const value: string = flatCell[key];
                        const symbolCount: number = String(value).length;
                        const localStyleId: string =
                            symbolCount * ptWidth >= colWidth ? styleType['BIG_DATA'] : styleType['BODY'];
                        bodyCellTemplate += renderCell(flatCell[key], localStyleId);
                    });

                    return bodyCellTemplate;
                }

                function generateHeadCell(titles: string[], styleType: PlainObject) {
                    return titles.reduce((headCellTemplate: string, title: string): string => {
                        let templates: Any = headCellTemplate;
                        templates += renderCell(title, styleType.HEAD);
                        return templates;
                    }, '');
                }

                function renderCell(value: Any, styleId: string, defaultType: string = 'String') {
                    // note: don't use isString here
                    // noinspection SuspiciousTypeOfGuard
                    const type: Any = typeof value === 'number' ? 'Number' : defaultType;
                    let cellValue: Any = transform(value, '-');

                    // note: don't use isString here
                    // noinspection SuspiciousTypeOfGuard
                    if (typeof cellValue === 'string') {
                        cellValue = cellValue.trim();
                        cellValue = cellValue.replace(/[<>]/g, '');
                    }
                    return `<Cell ss:StyleID="${styleId}"><Data ss:Type="${type}">${cellValue}</Data></Cell>`;
                }

                function transform(value: Any, fallback: Any) {
                    return checkValueIsEmpty(value) ? fallback : value;
                }

                function checkValueIsEmpty(value: Any) {
                    // TODO: need reuse utils in difference workers
                    // noinspection SuspiciousTypeOfGuard
                    const val: Any = typeof value === 'string' ? value.trim() : value;
                    return [undefined, null, NaN, '', 'null', Infinity].includes(val);
                }

                function getHeaderTitles(worksheet: ExcelWorksheet<T>, cell: Any, dictionary: Any) {
                    const flatCell: PlainObject = flatten(cell, worksheet.excludeKeys);
                    const keys: string[] =
                        typeof worksheet.keys?.length === 'number' ? worksheet.keys : Object.keys(flatCell);

                    return keys.map((key: string): string => {
                        const translatedKey: string =
                            // eslint-disable-next-line no-negated-condition
                            dictionary[`${worksheet?.prefixKeyForTranslate}.${key}`] !== undefined
                                ? dictionary[`${worksheet?.prefixKeyForTranslate}.${key}`]
                                : key;
                        return isTranslated(translatedKey, key) ? translatedKey : key;
                    });
                }

                function mutate(object: Any, depthGraph: Any, key: Any) {
                    const isObject: boolean = typeof object[key] === 'object' && object[key] !== null;
                    if (isObject) {
                        const flatObject: Any = flatten(object[key]);
                        for (const path in flatObject) {
                            // noinspection JSUnfilteredForInLoop
                            if (flatObject.hasOwnProperty(path) as boolean) {
                                // noinspection JSUnfilteredForInLoop
                                depthGraph[`${key}.${path}`] = flatObject[path];
                            }
                        }
                    } else {
                        depthGraph[key] = object[key];
                    }
                }

                function flatten(objectRef: Any, excludeKeys: string[] = []) {
                    const depthGraph: PlainObject = {};
                    for (const key in objectRef) {
                        // noinspection JSUnfilteredForInLoop
                        if ((objectRef?.hasOwnProperty(key) as boolean) && !excludeKeys.includes(key)) {
                            // noinspection JSUnfilteredForInLoop
                            mutate(objectRef, depthGraph, key);
                        }
                    }
                    return depthGraph;
                }

                function isTranslated(keyLeftPad: Any, keyRightPad: Any) {
                    return getPostfix(keyLeftPad) !== getPostfix(keyRightPad);
                }

                function getPostfix(key: Any) {
                    return key.split('.').pop();
                }

                // eslint-disable-next-line @typescript-eslint/typedef
                function commonStyles(font = '<Font ss:Bold="0" ss:FontName="Arial" />') {
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
                           ${worksheetsTemplates}
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
