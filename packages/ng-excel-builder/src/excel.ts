/* eslint-disable */
import { Injectable, InjectionToken, ModuleWithProviders, NgModule } from '@angular/core';
import { DatePipe, CommonModule } from '@angular/common';

type Any = any; // NOSONAR

type Fn<T = Any, U = Any> = (...args: T[]) => U;

interface WebWorkerThread<R = Any, U = Any> {
    run<T>(workerFunction: (input: R) => T, data?: Any): Promise<T>;
    runUrl(url: string, data?: R): Promise<U>;
    terminate<T>(promise: Promise<T>): Promise<T>;
    getWorker(promise: Promise<Any>): Worker | undefined;
}

type Executor<T = void> = (...args: Any[]) => T;

interface ObjectKeyMap<T = Any> {
    [key: string]: T;
}

const DATE_CONFIG = {
    locale: 'en-US',
    format: 'dd.MM.yyyy HH:mm:ss'
};

export interface ExcelWorkbook<T = Any> {
    filename: string;
    worksheets: Array<ExcelWorksheet<T>>;
    translateColumns: ObjectKeyMap;
}

export interface ExcelWorksheet<T = Any> {
    table: Array<ObjectKeyMap<T>>;
    worksheetName: string;
    titleKey: string;
    excludeKeys?: string[];
}

class SerialDate {
    static formatDateTime(time?: any, format?: any) {
        const timeValue = time || new Date().getTime();
        const formatValue = format || DATE_CONFIG.format;
        return new DatePipe(DATE_CONFIG.locale).transform(timeValue, formatValue);
    }
}

// noinspection DuplicatedCode
@Injectable()
export class WebWorkerThreadService implements WebWorkerThread {
    private readonly workerFunctionToUrlMap: WeakMap<Fn, string> = new WeakMap();
    private readonly promiseToWorkerMap: WeakMap<Promise<Any>, Worker> = new WeakMap();

    private static createWorkerUrl(resolve: Fn): string {
        const resolveString: string = resolve.toString();

        const webWorkerTemplate: string = `
            self.addEventListener('message', function(e) {
                postMessage((${resolveString})(e.data));
            });
        `;

        const blob: Blob = new Blob([webWorkerTemplate], { type: 'text/javascript' });
        return URL.createObjectURL(blob);
    }

    public run<T, K>(workerFunction: (input: K) => T, data?: K): Promise<T> {
        const url: string | undefined = this.getOrCreateWorkerUrl(workerFunction);
        return this.runUrl(url!, data);
    }

    public runUrl(url: string, data?: Any): Promise<Any> {
        const worker: Worker = new Worker(url);
        const promise: Promise<Any> = this.createPromiseForWorker(worker, data);
        const promiseCleaner: Any = this.createPromiseCleaner(promise);

        this.promiseToWorkerMap.set(promise, worker);

        promise.then(promiseCleaner).catch(promiseCleaner);

        return promise;
    }

    public terminate<T>(promise: Promise<T>): Promise<T> {
        return this.removePromise(promise);
    }

    public getWorker(promise: Promise<Any>): Worker | undefined {
        return this.promiseToWorkerMap.get(promise);
    }

    private createPromiseForWorker<T>(worker: Worker, data: Any): Promise<T> {
        return new Promise<T>((resolve: Executor<Any>, reject: Executor<Any>): void => {
            worker.addEventListener('message', (event: MessageEvent): boolean => resolve(event.data));
            worker.addEventListener('error', reject);
            worker.postMessage(data);
        });
    }

    private getOrCreateWorkerUrl(fn: Fn): string | undefined {
        if (!this.workerFunctionToUrlMap.has(fn)) {
            const url: string = WebWorkerThreadService.createWorkerUrl(fn);
            this.workerFunctionToUrlMap.set(fn, url);
            return url;
        }
        return this.workerFunctionToUrlMap.get(fn);
    }

    private createPromiseCleaner<T>(promise: Promise<T>): (input: Any) => T {
        return (event: T): T => {
            this.removePromise(promise);
            return event;
        };
    }

    private removePromise<T>(promise: Promise<T>): Promise<T> {
        const worker: Worker | undefined = this.promiseToWorkerMap.get(promise);

        if (worker) {
            worker.terminate();
        }

        this.promiseToWorkerMap.delete(promise);
        return promise;
    }
}

@Injectable()
export class ExcelBuilderService {
    constructor(public webWorker: WebWorkerThreadService) {}

    static downloadFile(fileBlob: any, fileName: string) {
        const anchor = document.createElement('a');
        const url = window.URL.createObjectURL(fileBlob);
        anchor.href = url;
        anchor.download = `${fileName}.${SerialDate.formatDateTime()}.xls`;
        anchor.click();
        window.URL.revokeObjectURL(url);
    }

    exportExcelByWorkbook(workbook: ExcelWorkbook) {
        this.webWorker
            .run((input: any) => {
                const PT_WIDTH = 5;
                const PT_SIZE = 7;
                const COL_WIDTH = 140;
                const ROW_HEIGHT = 40;

                const StyleType = {
                    HEAD: 'HeadCellStyle',
                    BODY: 'BodyCellStyle',
                    BIG_DATA: 'CellBigDataStyle'
                };

                const worksheetsTemplates = generateWorksheet(
                    input.worksheets,
                    flatten(input.translateColumns),
                    PT_WIDTH,
                    PT_SIZE,
                    COL_WIDTH,
                    ROW_HEIGHT,
                    StyleType
                );

                function generateWorksheet(
                    worksheets: any,
                    translatedColumns: any,
                    ptWidth: any,
                    ptSize: any,
                    colWidth: any,
                    rowHeight: any,
                    styleType: any
                ) {
                    let worksheetTemplates = '';

                    worksheets.forEach((worksheet: any) => {
                        const worksheetName = worksheet.worksheetName;
                        const headerTitles = getHeaderTitles(worksheet, worksheet.table[0], translatedColumns);
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

                function generateColumns(headerTitles: any, ptSize: any, colWidth: any) {
                    return headerTitles.reduce((columnTemplate: any, title: any) => {
                        const size = title.length * ptSize;
                        const width = size > colWidth ? size : colWidth;
                        columnTemplate += `<Column ss:Width="${width}" />`;
                        return columnTemplate;
                    }, '');
                }

                function generateRow(
                    worksheets: any,
                    data: any,
                    titles: any,
                    rowHeight: any,
                    ptWidth: any,
                    colWidth: any,
                    styleType: any
                ) {
                    let rowsTemplates = '';
                    data.forEach((cell: any, index: any) => {
                        const header = index === 0 ? `\t<Row>${generateHeadCell(titles, styleType)}\t</Row>` : '';
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

                function generateCell(worksheet: any, cell: any, ptWidth: any, colWidth: any, styleType: any) {
                    const flatCell = flatten(cell, worksheet.excludeKeys);
                    return generateBodyCell(flatCell, ptWidth, colWidth, styleType);
                }

                function generateBodyCell(flatCell: any, ptWidth: any, colWidth: any, styleType: any) {
                    let bodyCellTemplate = '';
                    for (const key in flatCell) {
                        if (flatCell.hasOwnProperty(key)) {
                            const value = flatCell[key];
                            const symbolCount = String(value).length;
                            const localStyleId =
                                symbolCount * ptWidth >= colWidth ? styleType['BIG_DATA'] : styleType['BODY'];
                            bodyCellTemplate += renderCell(flatCell[key], localStyleId);
                        }
                    }
                    return bodyCellTemplate;
                }

                function generateHeadCell(titles: any, styleType: any) {
                    return titles.reduce((headCellTemplate: any, title: any) => {
                        headCellTemplate += renderCell(title, styleType.HEAD);
                        return headCellTemplate;
                    }, '');
                }

                function renderCell(value: any, styleId: any, defaultType: string = 'String') {
                    const type = typeof value === 'number' ? 'Number' : defaultType;
                    let cellValue = transform(value, '-');
                    if (typeof cellValue === 'string') {
                        cellValue = cellValue.trim();
                        cellValue = cellValue.replace(/[<>]/g, '');
                    }
                    return `<Cell ss:StyleID="${styleId}"><Data ss:Type="${type}">${cellValue}</Data></Cell>`;
                }

                function transform(value: any, fallback: any) {
                    return checkValueIsEmpty(value) ? fallback : value;
                }

                function checkValueIsEmpty(value: any) {
                    const val = typeof value === 'string' ? value.trim() : value;
                    return [undefined, null, NaN, '', 'null', Infinity].includes(val);
                }

                function getHeaderTitles(worksheet: any, cell: any, dictionary: any) {
                    const flatCell = flatten(cell, worksheet.excludeKeys);
                    const columnKeys = Object.keys(flatCell);
                    return columnKeys.map((key) => {
                        const translatedKey =
                            dictionary[`${worksheet.titleKey}.${key}`] !== undefined
                                ? dictionary[`${worksheet.titleKey}.${key}`]
                                : key;
                        return isTranslated(translatedKey, key) ? translatedKey : key;
                    });
                }

                function mutate(object: any, depthGraph: any, key: any) {
                    const isObject = typeof object[key] === 'object' && object[key] !== null;
                    if (isObject) {
                        const flatObject: any = flatten(object[key]);
                        for (const path in flatObject) {
                            if (flatObject.hasOwnProperty(path)) {
                                depthGraph[`${key}.${path}`] = flatObject[path];
                            }
                        }
                    } else {
                        depthGraph[key] = object[key];
                    }
                }

                function flatten(object: any, excludeKeys: any[] = []) {
                    const depthGraph = {};
                    for (const key in object) {
                        if (object.hasOwnProperty(key) && !excludeKeys.includes(key)) {
                            mutate(object, depthGraph, key);
                        }
                    }
                    return depthGraph;
                }

                function isTranslated(keyLeftPad: any, keyRightPad: any) {
                    return getPostfix(keyLeftPad) !== getPostfix(keyRightPad);
                }

                function getPostfix(key: any) {
                    return key.split('.').pop();
                }

                function commonStyles(font = '<Font ss:Bold="0" ss:FontName="Arial" />') {
                    return `${font} <Borders><Border ss:Position="Bottom" ss:Color="#000000" ss:LineStyle="Continuous" ss:Weight="1"/><Border ss:Position="Right" ss:Color="#000000" ss:LineStyle="Continuous" ss:Weight="1"/></Borders>`; // NOSONAR
                }

                const template = `
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

                const UTF8 = '\ufeff';
                return new Blob([UTF8, template], { type: 'application/vnd.ms-excel;charset=UTF-8' });
            }, workbook)
            .then((blob: Blob) => {
                const fileName = workbook.filename;
                ExcelBuilderService.downloadFile(blob, fileName);
            });
    }
}

@NgModule({
    imports: [CommonModule],
    providers: [ExcelBuilderService, WebWorkerThreadService]
})
export class ExcelBuilderModule {
    public static ROOT_OPTIONS = new InjectionToken('ROOT_OPTIONS');

    static forRoot(config = {}): ModuleWithProviders<ExcelBuilderModule> {
        return {
            ngModule: ExcelBuilderModule,
            providers: [
                {
                    provide: ExcelBuilderModule.ROOT_OPTIONS,
                    useValue: config
                }
            ]
        };
    }
}
