/* eslint-disable @typescript-eslint/explicit-function-return-type,max-params-no-constructor/max-params-no-constructor */
import { Injectable } from '@angular/core';
import { toFormatDateTime } from '@angular-ru/common/date';
import { Any, PlainObject } from '@angular-ru/common/typings';
import { WebWorkerThreadService } from '@angular-ru/common/webworker';

import { ExcelWorkbook } from './symbols';

@Injectable()
export class ExcelBuilderService {
    constructor(public webWorker: WebWorkerThreadService) {}

    public static downloadFile(fileBlob: Blob, fileName: string): void {
        const anchor: HTMLAnchorElement = document.createElement('a');
        const url: string = window.URL.createObjectURL(fileBlob);
        anchor.href = url;
        anchor.download = `${fileName}.${toFormatDateTime()}.xls`;
        anchor.click();
        window.URL.revokeObjectURL(url);
    }

    // eslint-disable-next-line max-lines-per-function
    public exportExcelByWorkbook(workbook: ExcelWorkbook): void {
        this.webWorker
            // eslint-disable-next-line sonarjs/cognitive-complexity,max-lines-per-function
            .run((input: Any): Blob => {
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
                    flatten(input.translateColumns),
                    PT_WIDTH,
                    PT_SIZE,
                    COL_WIDTH,
                    ROW_HEIGHT,
                    StyleType
                );

                // eslint-disable-next-line max-lines-per-function
                function generateWorksheet(
                    worksheets: Any,
                    translatedColumns: Any,
                    ptWidth: Any,
                    ptSize: Any,
                    colWidth: Any,
                    rowHeight: Any,
                    styleType: Any
                ): string {
                    let worksheetTemplates: string = '';

                    // eslint-disable-next-line max-lines-per-function
                    worksheets.forEach((worksheet: Any): void => {
                        const worksheetName: string = worksheet.worksheetName;
                        const headerTitles: string[] = getHeaderTitles(
                            worksheet,
                            worksheet.table[0],
                            translatedColumns
                        );
                        worksheetTemplates += `
                          <Worksheet ss:Name="${worksheetName}"><Table ss:DefaultColumnWidth="${colWidth}" ss:DefaultRowHeight="${ROW_HEIGHT}">${generateColumns(
                            headerTitles,
                            ptSize,
                            colWidth
                        )}
                              ${generateRow(
                                  worksheet,
                                  worksheet.table,
                                  headerTitles,
                                  rowHeight,
                                  ptWidth,
                                  colWidth,
                                  styleType
                              )}
                            </Table> </Worksheet>
                          `;
                    });
                    return worksheetTemplates;
                }

                function generateColumns(headerTitles: Any, ptSize: Any, colWidth: Any) {
                    return headerTitles.reduce((columnTemplate: Any, title: Any): string => {
                        const size: number = title.length * ptSize;
                        const width: number = size > colWidth ? size : colWidth;
                        columnTemplate += `<Column ss:Width="${width}" />`;
                        return columnTemplate;
                    }, '');
                }

                // eslint-disable-next-line max-lines-per-function
                function generateRow(
                    worksheets: Any,
                    data: Any,
                    titles: Any,
                    rowHeight: Any,
                    ptWidth: Any,
                    colWidth: Any,
                    styleType: Any
                ) {
                    let rowsTemplates: string = '';
                    data.forEach((cell: Any, index: Any): void => {
                        const header: string =
                            index === 0 ? `\t<Row>${generateHeadCell(titles, styleType)}\t</Row>` : '';
                        rowsTemplates += `${header}<Row ss:Height="${rowHeight}"> ${generateCell(
                            worksheets,
                            cell,
                            ptWidth,
                            colWidth,
                            styleType
                        )}  </Row>
                                         `;
                    });
                    return rowsTemplates;
                }

                function generateCell(worksheet: Any, cell: Any, ptWidth: Any, colWidth: Any, styleType: Any) {
                    const flatCell: PlainObject = flatten(cell, worksheet.excludeKeys);
                    return generateBodyCell(flatCell, ptWidth, colWidth, styleType);
                }

                function generateBodyCell(flatCell: Any, ptWidth: Any, colWidth: Any, styleType: Any) {
                    let bodyCellTemplate: string = '';
                    for (const key in flatCell) {
                        if (flatCell.hasOwnProperty(key)) {
                            const value: string = flatCell[key];
                            const symbolCount: number = String(value).length;
                            const localStyleId: string =
                                symbolCount * ptWidth >= colWidth ? styleType['BIG_DATA'] : styleType['BODY'];
                            bodyCellTemplate += renderCell(flatCell[key], localStyleId);
                        }
                    }
                    return bodyCellTemplate;
                }

                function generateHeadCell(titles: Any, styleType: Any) {
                    return titles.reduce((headCellTemplate: Any, title: Any): string => {
                        headCellTemplate += renderCell(title, styleType.HEAD);
                        return headCellTemplate;
                    }, '');
                }

                function renderCell(value: Any, styleId: Any, defaultType: string = 'String') {
                    const type: Any = typeof value === 'number' ? 'Number' : defaultType;
                    let cellValue: Any = transform(value, '-');
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
                    const val: Any = typeof value === 'string' ? value.trim() : value;
                    return [undefined, null, NaN, '', 'null', Infinity].includes(val);
                }

                function getHeaderTitles(worksheet: Any, cell: Any, dictionary: Any) {
                    const flatCell: PlainObject = flatten(cell, worksheet.excludeKeys);
                    const columnKeys: string[] = Object.keys(flatCell);
                    return columnKeys.map((key: string): string => {
                        const translatedKey: string =
                            // eslint-disable-next-line no-negated-condition
                            dictionary[`${worksheet.titleKey}.${key}`] !== undefined
                                ? dictionary[`${worksheet.titleKey}.${key}`]
                                : key;
                        return isTranslated(translatedKey, key) ? translatedKey : key;
                    });
                }

                function mutate(object: Any, depthGraph: Any, key: Any) {
                    const isObject: boolean = typeof object[key] === 'object' && object[key] !== null;
                    if (isObject) {
                        const flatObject: Any = flatten(object[key]);
                        for (const path in flatObject) {
                            if (flatObject.hasOwnProperty(path)) {
                                depthGraph[`${key}.${path}`] = flatObject[path];
                            }
                        }
                    } else {
                        depthGraph[key] = object[key];
                    }
                }

                function flatten(object: Any, excludeKeys: Any[] = []) {
                    const depthGraph: PlainObject = {};
                    for (const key in object) {
                        if (object.hasOwnProperty(key) && !excludeKeys.includes(key)) {
                            mutate(object, depthGraph, key);
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
                    return `${font} <Borders><Border ss:Position="Bottom" ss:Color="#000000" ss:LineStyle="Continuous" ss:Weight="1"/><Border ss:Position="Right" ss:Color="#000000" ss:LineStyle="Continuous" ss:Weight="1"/></Borders>`; // NOSONAR
                }

                const template: string = `
                          <?xml version="1.0"?>
                          <?mso-application progid="Excel.Sheet"?>
                          <Workbook
                           xmlns="urn:schemas-microsoft-com:office:spreadsheet"
                           xmlns:o="urn:schemas-microsoft-com:office:office"
                           xmlns:x="urn:schemas-microsoft-com:office:excel"
                           xmlns:ss="urn:schemas-microsoft-com:office:spreadsheet"
                           xmlns:html="http://www.w3.org/TR/REC-html40">
                           <Styles>
                            <Style ss:ID="${StyleType.HEAD}">
                               <Alignment ss:Horizontal="Center" ss:Vertical="Center" ss:WrapText="0" />
                               ${commonStyles('<Font ss:Bold="1" ss:FontName="Arial" />')}
                            </Style>
                            <Style ss:ID="${StyleType.BIG_DATA}">
                               <Alignment ss:Horizontal="Left" ss:Vertical="Top" ss:WrapText="1" />
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
            .then((blob: Blob): void => {
                const fileName: string = workbook.filename;
                ExcelBuilderService.downloadFile(blob, fileName);
            });
    }
}
