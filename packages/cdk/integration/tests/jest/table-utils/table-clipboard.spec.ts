/* eslint-disable no-restricted-globals */
import { TestBed } from '@angular/core/testing';
import { takeFirstItem } from '@angular-ru/cdk/array';
import { TableClipboardModule, TableClipboardService } from '@angular-ru/cdk/table-utils';
import { Nullable, PlainObject } from '@angular-ru/cdk/typings';
import { WebWorkerThreadService } from '@angular-ru/cdk/webworker';
import { TranslateService } from '@ngx-translate/core';
import { Observable, of } from 'rxjs';

import { fileSuitesReader, readFromBlob } from '../helpers/file-utils';
import { dataset, datasetNested, datasetTranslated, translationMap } from '../helpers/table-mock-data';

describe('[TEST] Table clipboard service', () => {
    let tableClipboard: TableClipboardService;
    let copySpy: jest.SpyInstance;

    const readFile = fileSuitesReader(__dirname);

    const mockWebWorker: Partial<WebWorkerThreadService> = {
        run<T, K>(workerFunction: (input: K) => T, data?: K): Promise<T> {
            return Promise.resolve(workerFunction(data!));
        }
    };

    class TranslateMock {
        public currentLang = 'en';
        public map: PlainObject = translationMap;

        public getTranslation(): Observable<Nullable<PlainObject>> {
            return of(this.map);
        }
    }

    class ClipboardItemMock {
        constructor(public types: Record<string, Blob>) {}
    }

    beforeEach((): void => {
        TestBed.configureTestingModule({
            imports: [TableClipboardModule],
            providers: [
                { provide: WebWorkerThreadService, useValue: mockWebWorker },
                { provide: TranslateService, useClass: TranslateMock }
            ]
        });

        const mockWindow = Object.create(window, {
            ClipboardItem: { value: ClipboardItemMock },
            navigator: { value: { clipboard: { write: () => void 0 } } }
        });

        copySpy = jest.spyOn(mockWindow.navigator.clipboard, 'write');
        const windowSpy = jest.spyOn(global, 'window', 'get');

        windowSpy.mockImplementation(() => mockWindow);
        tableClipboard = TestBed.inject(TableClipboardService);
    });

    afterEach((): void => {
        copySpy.mockReset();
    });

    it('should correctly convert to plain html', async () => {
        await tableClipboard.generateTableAndCopy({ entries: dataset });
        await new Promise((resolve) => setTimeout(resolve));
        const blob = getClipboardItemFromMock().types['text/html'];

        await expect(readFromBlob(blob)).resolves.toBe(readFile('test-1-simple.html'));
    });

    it('should correctly convert to plain html by keys', async () => {
        await tableClipboard.generateTableAndCopy({
            entries: dataset,
            rules: { includeKeys: ['id', 'lastName', 'falseField'] }
        });
        await new Promise((resolve) => setTimeout(resolve));
        const blob = getClipboardItemFromMock().types['text/html'];

        await expect(readFromBlob(blob)).resolves.toBe(readFile('test-2-by-keys.html'));
    });

    it('should correctly convert to plain html excluding keys', async () => {
        await tableClipboard.generateTableAndCopy({
            entries: dataset,
            rules: { excludeKeys: ['firstName', 'falseField'] }
        });
        await new Promise((resolve) => setTimeout(resolve));
        const blob = getClipboardItemFromMock().types['text/html'];

        await expect(readFromBlob(blob)).resolves.toBe(readFile('test-3-exclude-keys.html'));
    });

    it('should correctly convert nested data to plain html with options', async () => {
        await tableClipboard.generateTableAndCopy({
            entries: datasetNested,
            rules: { excludeKeys: ['firstName', 'locale.code'] }
        });
        await new Promise((resolve) => setTimeout(resolve));
        const blob = getClipboardItemFromMock().types['text/html'];

        await expect(readFromBlob(blob)).resolves.toBe(readFile('test-4-options.html'));
    });

    it('should correctly convert nested data with translate', async () => {
        await tableClipboard.generateTableAndCopy({
            entries: datasetTranslated,
            translationPrefix: 'model'
        });
        await new Promise((resolve) => setTimeout(resolve));
        const blob = getClipboardItemFromMock().types['text/html'];

        await expect(readFromBlob(blob)).resolves.toBe(readFile('test-5-translate.html'));
    });

    function getClipboardItemFromMock(): ClipboardItemMock {
        const firstCall = takeFirstItem(copySpy.mock.calls);
        const firstArgument = takeFirstItem(firstCall);

        return takeFirstItem(firstArgument);
    }
});
