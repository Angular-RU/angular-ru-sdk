import { TestBed } from '@angular/core/testing';
import { TableClipboardModule } from '@angular-ru/common/table-utils';
import { Nullable, PlainObject } from '@angular-ru/common/typings';
import { WebWorkerThreadService } from '@angular-ru/common/webworker';
import { TranslateService } from '@ngx-translate/core';
import { Observable, of } from 'rxjs';

import { TableClipboardService } from '../../../dist/library/table-utils';
import { dataset, datasetNested, datasetTranslated, translationMap } from './helpers/file-suites/mock-data';
import { readFile, readFromBlob } from './helpers/file-utils';

describe('[TEST] Table clipboard service', () => {
    let tableClipboard: TableClipboardService;
    let copySpy: jest.SpyInstance;

    const mockWebWorker: Partial<WebWorkerThreadService> = {
        run<T, K>(workerFunction: (input: K) => T, data?: K): Promise<T> {
            return Promise.resolve(workerFunction(data!));
        }
    };

    class TranslateMock {
        currentLang = 'en';
        map: PlainObject = translationMap;

        getTranslation(): Observable<Nullable<PlainObject>> {
            return of(this.map);
        }
    }

    class ClipboardItemMock {
        constructor(public types: Record<string, Blob>) {}
    }

    beforeEach(function (): void {
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

    afterEach(function (): void {
        copySpy.mockReset();
    });

    it('should correctly convert to plain html', async () => {
        tableClipboard.generateTableAndCopy({ entries: dataset });
        await new Promise((resolve) => setTimeout(resolve));
        const blob = copySpy.mock.calls[0][0][0].types['text/html'];
        expect(await readFromBlob(blob)).toBe(readFile('clipboard', 'test-1-simple.html'));
    });

    it('should correctly convert to plain html by keys', async () => {
        tableClipboard.generateTableAndCopy({
            entries: dataset,
            rules: { includeKeys: ['id', 'lastName', 'falseField'] }
        });
        await new Promise((resolve) => setTimeout(resolve));
        const blob = copySpy.mock.calls[0][0][0].types['text/html'];
        expect(await readFromBlob(blob)).toBe(readFile('clipboard', 'test-2-by-keys.html'));
    });

    it('should correctly convert to plain html excluding keys', async () => {
        tableClipboard.generateTableAndCopy({
            entries: dataset,
            rules: { excludeKeys: ['firstName', 'falseField'] }
        });
        await new Promise((resolve) => setTimeout(resolve));
        const blob = copySpy.mock.calls[0][0][0].types['text/html'];
        expect(await readFromBlob(blob)).toBe(readFile('clipboard', 'test-3-exclude-keys.html'));
    });

    it('should correctly convert nested data to plain html with options', async () => {
        tableClipboard.generateTableAndCopy({
            entries: datasetNested,
            rules: { excludeKeys: ['firstName', 'locale.code'] }
        });
        await new Promise((resolve) => setTimeout(resolve));
        const blob = copySpy.mock.calls[0][0][0].types['text/html'];
        expect(await readFromBlob(blob)).toBe(readFile('clipboard', 'test-4-options.html'));
    });

    it('should correctly convert nested data with translate', async () => {
        tableClipboard.generateTableAndCopy({
            entries: datasetTranslated,
            translationPrefix: 'model'
        });
        await new Promise((resolve) => setTimeout(resolve));
        const blob = copySpy.mock.calls[0][0][0].types['text/html'];
        expect(await readFromBlob(blob)).toBe(readFile('clipboard', 'test-5-translate.html'));
    });
});
