import { TestBed } from '@angular/core/testing';
import {
    ColumnWidth,
    EXCEL_BUILDER_INTERCEPTOR_TOKEN,
    ExcelBuilderModule,
    ExcelBuilderTextColumnInterceptor,
    ExcelService
} from '@angular-ru/cdk/excel';
import { getValueByPath } from '@angular-ru/cdk/object';
import { Any, Nullable, PlainObject } from '@angular-ru/cdk/typings';
import { isNotNil } from '@angular-ru/cdk/utils';
import { WebWorkerThreadService } from '@angular-ru/cdk/webworker';
import { Observable, of } from 'rxjs';

import { fileSuitesReader, readFromBlob } from '../helpers/file-utils';
import { dataset, datasetNested, datasetTranslated, translationMap } from '../helpers/table-mock-data';

describe('[TEST] Excel service', () => {
    let excelService: ExcelService;
    let downloadSpy: jest.SpyInstance;

    const readFile = fileSuitesReader(__dirname);

    const mockWebWorker: Partial<WebWorkerThreadService> = {
        run<T, K>(workerFunction: (input: K) => T, data?: K): Promise<T> {
            return Promise.resolve(workerFunction(data!));
        }
    };

    class TranslateMock implements ExcelBuilderTextColumnInterceptor {
        public map: PlainObject = translationMap;

        public getTranslationMap(): Observable<Nullable<PlainObject>> {
            return of(this.map);
        }

        public instant(key?: Nullable<string>): Nullable<string> {
            return isNotNil(key) ? getValueByPath(this.map, key) : key;
        }
    }

    beforeEach((): void => {
        TestBed.configureTestingModule({
            imports: [ExcelBuilderModule.forRoot()],
            providers: [
                { provide: WebWorkerThreadService, useValue: mockWebWorker },
                { provide: EXCEL_BUILDER_INTERCEPTOR_TOKEN, useClass: TranslateMock }
            ]
        });
        excelService = TestBed.inject(ExcelService);
        downloadSpy = jest.spyOn(excelService.builder.constructor, 'downloadWorkbook');
        downloadSpy.mockImplementation(() => {
            /* noop*/
        });
    });

    afterEach((): void => {
        downloadSpy.mockReset();
    });

    it('should correctly convert to excel xml', async () => {
        excelService.exportExcel({
            filename: 'simple',
            worksheets: [{ entries: dataset }]
        });
        // eslint-disable-next-line no-restricted-globals
        await new Promise((resolve) => setTimeout(resolve));
        const [blob, filename] = downloadSpy.mock.calls[0];

        await expect(readFromBlob(blob)).resolves.toBe(readFile('test-1-simple.xls'));
        expect(filename).toBe('simple');
    });

    it('should correctly convert to excel xml by keys', async () => {
        excelService.exportExcel({
            filename: 'by-keys',
            worksheets: [{ entries: dataset, keys: ['id', 'lastName', 'falseField'] }]
        });
        // eslint-disable-next-line no-restricted-globals
        await new Promise((resolve) => setTimeout(resolve));
        const [blob, filename] = downloadSpy.mock.calls[0];

        await expect(readFromBlob(blob)).resolves.toBe(readFile('test-2-by-keys.xls'));
        expect(filename).toBe('by-keys');
    });

    it('should correctly convert to excel xml excluding keys', async () => {
        excelService.exportExcel({
            filename: 'exclude-keys',
            worksheets: [
                {
                    entries: dataset,
                    excludeKeys: ['firstName', 'falseField']
                }
            ]
        });
        // eslint-disable-next-line no-restricted-globals
        await new Promise((resolve) => setTimeout(resolve));
        const [blob, filename] = downloadSpy.mock.calls[0];

        await expect(readFromBlob(blob)).resolves.toBe(readFile('test-3-exclude-keys.xls'));
        expect(filename).toBe('exclude-keys');
    });

    it('should correctly convert nested data to excel xml with options', async () => {
        excelService.exportExcel({
            filename: 'options',
            worksheets: [
                {
                    entries: datasetNested,
                    excludeKeys: ['firstName', 'locale.code'],
                    columnParameters: {
                        falseField: { width: 1000 },
                        lastName: { width: ColumnWidth.MAX_WIDTH },
                        'locale.lang': { width: 50 },
                        'locale.country': { width: 70 }
                    }
                }
            ]
        });
        // eslint-disable-next-line no-restricted-globals
        await new Promise((resolve) => setTimeout(resolve));
        const [blob, filename] = downloadSpy.mock.calls[0];

        await expect(readFromBlob(blob)).resolves.toBe(readFile('test-4-options.xls'));
        expect(filename).toBe('options');
    });

    it('should correctly convert nested data with translate', async () => {
        excelService.exportExcel({
            filename: 'translate',
            worksheets: [
                {
                    entries: datasetTranslated,
                    prefixKeyForTranslate: 'model',
                    columnParameters: {
                        name: { width: ColumnWidth.MAX_WIDTH }
                    }
                }
            ]
        });
        // eslint-disable-next-line no-restricted-globals
        await new Promise((resolve) => setTimeout(resolve));
        const [blob, filename] = downloadSpy.mock.calls[0];

        await expect(readFromBlob(blob)).resolves.toBe(readFile('test-5-translate.xls'));
        expect(filename).toBe('translate');
    });

    describe('should correctly calculate auto width', () => {
        it('case #1', async () => {
            excelService.exportExcel({
                filename: 'auto-width',
                worksheets: [
                    {
                        entries: datasetNested,
                        columnParameters: {
                            id: { width: ColumnWidth.MAX_WIDTH },
                            firstName: { width: ColumnWidth.MAX_WIDTH },
                            lastName: { width: ColumnWidth.MAX_WIDTH },
                            age: { width: ColumnWidth.MAX_WIDTH },
                            'locale.code': { width: ColumnWidth.MAX_WIDTH },
                            'locale.lang': { width: ColumnWidth.MAX_WIDTH },
                            'locale.country': { width: ColumnWidth.MAX_WIDTH }
                        }
                    }
                ]
            });
            // eslint-disable-next-line no-restricted-globals
            await new Promise((resolve) => setTimeout(resolve));
            const [blob, filename] = downloadSpy.mock.calls[0];

            await expect(readFromBlob(blob)).resolves.toBe(readFile('test-6-auto-width.xls'));
            expect(filename).toBe('auto-width');
        });

        it('case #2', async () => {
            excelService.exportExcel({
                filename: 'auto-width-translate',
                worksheets: [
                    {
                        entries: datasetTranslated,
                        prefixKeyForTranslate: 'model',
                        columnParameters: {
                            uid: { width: ColumnWidth.MAX_WIDTH },
                            name: { width: ColumnWidth.MAX_WIDTH },
                            'appearance.color': { width: ColumnWidth.MAX_WIDTH },
                            'appearance.shape': { width: ColumnWidth.MAX_WIDTH }
                        }
                    }
                ]
            });
            // eslint-disable-next-line no-restricted-globals
            await new Promise((resolve) => setTimeout(resolve));
            const [blob, filename] = downloadSpy.mock.calls[0];

            await expect(readFromBlob(blob)).resolves.toBe(readFile('test-7-auto-width-translate.xls'));
            expect(filename).toBe('auto-width-translate');
        });

        it('case #3', async () => {
            excelService.exportExcel({
                filename: 'auto-width',
                worksheets: [
                    {
                        entries: datasetNested,
                        columnParameters: {
                            id: { width: 50 }
                        },
                        generalColumnParameters: {
                            width: ColumnWidth.MAX_WIDTH
                        }
                    }
                ]
            });
            // eslint-disable-next-line no-restricted-globals
            await new Promise((resolve) => setTimeout(resolve));
            const [blob, filename] = downloadSpy.mock.calls[0];

            await expect(readFromBlob(blob)).resolves.toBe(readFile('test-8-auto-width.xls'));
            expect(filename).toBe('auto-width');
        });
    });
});
