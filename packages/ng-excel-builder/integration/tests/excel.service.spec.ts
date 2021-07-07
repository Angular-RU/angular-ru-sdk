import { TestBed } from '@angular/core/testing';
import { getValueByPath } from '@angular-ru/common/object';
import { Any, Nullable, PlainObject } from '@angular-ru/common/typings';
import { isNotNil } from '@angular-ru/common/utils';
import { WebWorkerThreadService } from '@angular-ru/common/webworker';
import {
    ColumnWidth,
    EXCEL_BUILDER_INTERCEPTOR_TOKEN,
    ExcelBuilderModule,
    ExcelBuilderTextColumnInterceptor,
    ExcelService
} from '@angular-ru/ng-excel-builder';
import { Observable, of } from 'rxjs';

import { readFile, readFromBlob } from './helpers/file-utils';

describe('[TEST] Excel service', () => {
    let excelService: ExcelService;
    let downloadSpy: jest.SpyInstance;

    const mockWebWorker: Partial<WebWorkerThreadService> = {
        run<T, K>(workerFunction: (input: K) => T, data?: K): Promise<T> {
            return Promise.resolve(workerFunction(data!));
        }
    };

    class TranslateMock implements ExcelBuilderTextColumnInterceptor {
        map: PlainObject = { model: { uid: 'UID', name: 'Name', appearance: { color: 'Color', shape: 'Shape' } } };
        getTranslationMap(): Observable<Nullable<PlainObject>> {
            return of(this.map);
        }
        instant(key?: Nullable<string>): Nullable<string> {
            return isNotNil(key) ? getValueByPath(this.map, key) : key;
        }
    }

    const dataset: PlainObject[] = [
        { id: 1, firstName: 'albattani', lastName: 'herschel', age: 32, nullable: null },
        { id: 2, firstName: 'allen', lastName: 'hermann', age: 42, nullable: 'not null' },
        { id: 3, firstName: 'almeida', lastName: 'heisenberg', age: 50, nullable: 'not null' },
        { nullable: undefined, id: 4, firstName: 'antonelli', age: 19 },
        { firstName: 'agnesi', id: 5, lastName: 'hawking', age: 22, nullable: null }
    ];

    const datasetNested: PlainObject[] = [
        {
            id: 1,
            firstName: 'albattani',
            lastName: 'herschel',
            age: 32,
            locale: { country: 'uk', lang: 'en', code: 44 }
        },
        { id: 2, firstName: 'allen', lastName: 'hermann', age: 42, locale: { country: 'us', lang: 'en', code: 1 } },
        { id: 3, firstName: 'antonelli', age: 19, locale: { country: 'at', lang: 'de', code: 43 } },
        { id: 4, firstName: 'almeida', lastName: 'hawking', age: 42, locale: { country: 'ru', lang: 'ru', code: 7 } }
    ];

    const datasetTranslated: PlainObject[] = [
        { uid: 'qwe-123', name: 'albattani', appearance: { color: 'black', shape: 'square' } },
        { uid: 'wer-456', name: 'allen', appearance: { color: 'red', shape: 'arrow' } },
        { uid: 'asd-434', name: 'antonelli', appearance: { color: null, shape: null } }
    ];

    beforeEach(function (): void {
        TestBed.configureTestingModule({
            imports: [ExcelBuilderModule.forRoot()],
            providers: [
                { provide: WebWorkerThreadService, useValue: mockWebWorker },
                { provide: EXCEL_BUILDER_INTERCEPTOR_TOKEN, useClass: TranslateMock }
            ]
        });
        excelService = TestBed.inject(ExcelService);
        downloadSpy = jest.spyOn((excelService as Any).builder.constructor, 'downloadWorkbook');
        downloadSpy.mockImplementation(() => {
            /* noop*/
        });
    });

    afterEach(function (): void {
        downloadSpy.mockReset();
    });

    it('should correctly convert to excel xml', async () => {
        excelService.exportExcel({
            filename: 'simple',
            worksheets: [{ entries: dataset }]
        });
        await new Promise((resolve) => setTimeout(resolve));
        const [blob, filename] = downloadSpy.mock.calls[0];
        expect(await readFromBlob(blob)).toBe(readFile('test-1-simple.xls'));
        expect(filename).toBe('simple');
    });

    it('should correctly convert to excel xml by keys', async () => {
        excelService.exportExcel({
            filename: 'by-keys',
            worksheets: [{ entries: dataset, keys: ['id', 'lastName', 'falseField'] }]
        });
        await new Promise((resolve) => setTimeout(resolve));
        const [blob, filename] = downloadSpy.mock.calls[0];
        expect(await readFromBlob(blob)).toBe(readFile('test-2-by-keys.xls'));
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
        await new Promise((resolve) => setTimeout(resolve));
        const [blob, filename] = downloadSpy.mock.calls[0];
        expect(await readFromBlob(blob)).toBe(readFile('test-3-exclude-keys.xls'));
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
        await new Promise((resolve) => setTimeout(resolve));
        const [blob, filename] = downloadSpy.mock.calls[0];
        expect(await readFromBlob(blob)).toBe(readFile('test-4-options.xls'));
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
        await new Promise((resolve) => setTimeout(resolve));
        const [blob, filename] = downloadSpy.mock.calls[0];
        expect(await readFromBlob(blob)).toBe(readFile('test-5-translate.xls'));
        expect(filename).toBe('translate');
    });
});
