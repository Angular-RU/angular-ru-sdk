import { ChangeDetectorRef } from '@angular/core';
import {
    $any,
    $cast,
    checkEveryValueIsEmpty,
    checkEveryValueIsFalse,
    checkEveryValueIsTrue,
    checkSomeValueIsEmpty,
    checkSomeValueIsFalse,
    checkSomeValueIsTrue,
    checkValueIsEmpty,
    checkValueIsFilled,
    detectChanges,
    downloadFile,
    fallbackIfEmpty,
    isBoolean,
    isIE,
    isMacOS,
    isNil,
    isNotNil,
    parseXmlFromString,
    serializeXmlToString,
    tryParseJson
} from '@angular-ru/cdk/utils';
import { FileToDownloadInfo } from '@angular-ru/cdk/utils/download-file';

describe('[TEST]: Common utils', () => {
    it('$any/$cast', () => {
        expect(parseInt($any(1) + $cast('2'))).toBe(12);
    });

    it('is null or undefined', () => {
        expect(isNil(null)).toBe(true);
        expect(isNil(undefined)).toBe(true);
        expect(isNil('')).toBe(false);
        expect(isNil(0)).toBe(false);
    });

    it('is not null or undefined', () => {
        expect(isNotNil(0)).toBe(true);
        expect(isNotNil('')).toBe(true);
        expect(isNotNil(null)).toBe(false);
        expect(isNotNil(undefined)).toBe(false);
    });

    it('is empty value', () => {
        expect(checkValueIsEmpty(0)).toBe(false);
        expect(checkValueIsEmpty('x')).toBe(false);
        expect(checkValueIsEmpty('null')).toBe(false);
        expect(checkValueIsEmpty('')).toBe(true);
        expect(checkValueIsEmpty('    ')).toBe(true);
        expect(checkValueIsEmpty(NaN)).toBe(true);
        expect(checkValueIsEmpty(undefined)).toBe(true);
        expect(checkValueIsEmpty(null)).toBe(true);
    });

    it('is filled value', () => {
        expect(checkValueIsFilled(null)).toBe(false);
        expect(checkValueIsFilled(NaN)).toBe(false);
        expect(checkValueIsFilled(Infinity)).toBe(false);
        expect(checkValueIsFilled(undefined)).toBe(false);
        expect(checkValueIsFilled('    ')).toBe(false);
        expect(checkValueIsFilled(false)).toBe(true);
        expect(checkValueIsFilled(true)).toBe(true);
        expect(checkValueIsFilled(0)).toBe(true);
        expect(checkValueIsFilled('x')).toBe(true);
        expect(checkValueIsFilled('null')).toBe(true);
    });

    it('detect changes invoked three times', () => {
        let count: number = 0;
        const cd: ChangeDetectorRef = {
            detectChanges() {
                count++;
            }
        } as ChangeDetectorRef;

        detectChanges();
        detectChanges(cd);
        detectChanges(null);
        detectChanges([cd, cd]);

        expect(count).toBe(3);
    });

    it('isIE', () => {
        expect(isIE('Internet Explorer 9 (MSIE 9.0)')).toBe(true);
        expect(isIE('Chrome')).toBe(false);
    });

    it('simple parse xml', () => {
        const xml = parseXmlFromString('<hello>123</hello>');

        expect(xml.querySelector('hello')?.textContent).toBe('123');
    });

    it('parse nested xml', () => {
        const xml = parseXmlFromString(`
          <root>
            <a>
                <b>1</b>
                <c>2</c>
            </a>
          </root>
        `);

        expect(xml.querySelector('a b')?.textContent).toBe('1');
        expect(xml.querySelector('c')?.textContent).toBe('2');
    });

    it('xml to string', () => {
        const xml = parseXmlFromString('<hello>123</hello>');

        expect(serializeXmlToString(xml)).toBe('<hello>123</hello>');
    });

    it('checkEveryValueIsEmpty should return false for a set of filled values', () =>
        expect(checkEveryValueIsEmpty(42, 'hello world', {})).toBe(false));

    it('checkEveryValueIsEmpty should return false for a set of values containing filled values', () =>
        expect(checkEveryValueIsEmpty(42, 'hello world', null)).toBe(false));

    it('checkEveryValueIsEmpty should return false for a set of empty values', () =>
        expect(checkEveryValueIsEmpty('', undefined, null)).toBe(true));

    it('checkSomeValueIsEmpty should return false for a set of filled values', () =>
        expect(checkSomeValueIsEmpty(42, 'hello world', {})).toBe(false));

    it('checkSomeValueIsEmpty should return true for a set of values containing empty values', () =>
        expect(checkSomeValueIsEmpty(42, 'hello world', null)).toBe(true));

    it('checkSomeValueIsEmpty should return true for a set of empty values', () =>
        expect(checkSomeValueIsEmpty('', undefined, null)).toBe(true));

    it('isMacOS should return true if user agent shows that user has MacOS and false if otherwise', () => {
        expect(isMacOS({ userAgent: `Mac` } as unknown as Navigator)).toBeTruthy();
        expect(isMacOS({ userAgent: `Linux` } as unknown as Navigator)).toBeFalsy();
    });

    describe('[TEST]: checkSomeValueIsTrue', () => {
        it('should return true if any item has value: "true"', () => {
            expect(checkSomeValueIsTrue(true)).toBe(true);
            expect(checkSomeValueIsTrue(true, true)).toBe(true);
            expect(checkSomeValueIsTrue([], true)).toBe(true);
            expect(checkSomeValueIsTrue('', undefined, null, true)).toBe(true);
            expect(checkSomeValueIsTrue('a', 13, {}, true)).toBe(true);
        });

        it('should return false if no item has value: "true"', () => {
            expect(checkSomeValueIsTrue()).toBe(false);
            expect(checkSomeValueIsTrue(false)).toBe(false);
            expect(checkSomeValueIsTrue(false, false)).toBe(false);
            expect(checkSomeValueIsTrue([])).toBe(false);
            expect(checkSomeValueIsTrue([true])).toBe(false);
            expect(checkSomeValueIsTrue('', undefined, null)).toBe(false);
            expect(checkSomeValueIsTrue('a', 13, {})).toBe(false);
        });
    });

    describe('[TEST]: checkSomeValueIsFalse', () => {
        it('should return true if any item has value: "false"', () => {
            expect(checkSomeValueIsFalse(false)).toBe(true);
            expect(checkSomeValueIsFalse(false, false)).toBe(true);
            expect(checkSomeValueIsFalse([], false)).toBe(true);
            expect(checkSomeValueIsFalse('', undefined, null, false)).toBe(true);
            expect(checkSomeValueIsFalse('a', 13, {}, false)).toBe(true);
        });

        it('should return false if no item has value: "false"', () => {
            expect(checkSomeValueIsFalse()).toBe(false);
            expect(checkSomeValueIsFalse(true)).toBe(false);
            expect(checkSomeValueIsFalse(true, true)).toBe(false);
            expect(checkSomeValueIsFalse([])).toBe(false);
            expect(checkSomeValueIsFalse([false])).toBe(false);
            expect(checkSomeValueIsFalse('', undefined, null)).toBe(false);
            expect(checkSomeValueIsFalse('a', 13, {})).toBe(false);
        });
    });

    describe('[TEST]: checkEveryValueIsTrue', () => {
        it('should return true if every item has value: "true"', () => {
            expect(checkEveryValueIsTrue(true)).toBe(true);
            expect(checkEveryValueIsTrue(true, true)).toBe(true);
            expect(checkEveryValueIsTrue(true, true, true)).toBe(true);
        });

        it('should return false if not every item has value: "true"', () => {
            expect(checkEveryValueIsTrue()).toBe(false);
            expect(checkEveryValueIsTrue(false)).toBe(false);
            expect(checkEveryValueIsTrue(false, false)).toBe(false);
            expect(checkEveryValueIsTrue(false, true)).toBe(false);
            expect(checkEveryValueIsTrue([])).toBe(false);
            expect(checkEveryValueIsTrue([true])).toBe(false);
            expect(checkEveryValueIsTrue('', undefined, null, true)).toBe(false);
            expect(checkEveryValueIsTrue('a', 13, {}, true)).toBe(false);
            expect(checkEveryValueIsTrue(true, true, {})).toBe(false);
            expect(checkEveryValueIsTrue(true, true, 'a')).toBe(false);
            expect(checkEveryValueIsTrue(true, true, 13)).toBe(false);
        });
    });

    describe('[TEST]: checkEveryValueIsFalse', () => {
        it('should return true if every item has value: "false"', () => {
            expect(checkEveryValueIsFalse(false)).toBe(true);
            expect(checkEveryValueIsFalse(false, false)).toBe(true);
            expect(checkEveryValueIsFalse(false, false, false)).toBe(true);
        });

        it('should return false if not every item has value: "false"', () => {
            expect(checkEveryValueIsFalse()).toBe(false);
            expect(checkEveryValueIsFalse(true)).toBe(false);
            expect(checkEveryValueIsFalse(true, true)).toBe(false);
            expect(checkEveryValueIsFalse(false, true)).toBe(false);
            expect(checkEveryValueIsFalse([])).toBe(false);
            expect(checkEveryValueIsFalse([false])).toBe(false);
            expect(checkEveryValueIsFalse('', undefined, null, false)).toBe(false);
            expect(checkEveryValueIsFalse('a', 13, {}, false)).toBe(false);
            expect(checkEveryValueIsFalse(false, false, {})).toBe(false);
            expect(checkEveryValueIsFalse(false, false, 'a')).toBe(false);
            expect(checkEveryValueIsFalse(false, false, 13)).toBe(false);
        });
    });

    describe('[TEST]: fallbackIfEmpty', () => {
        it('should return value if it is filled', () => {
            expect(fallbackIfEmpty(false, 'fallback')).toBe(false);
            expect(fallbackIfEmpty(true, 'fallback')).toBe(true);
            expect(fallbackIfEmpty([], 'fallback')).toEqual([]);
            expect(fallbackIfEmpty(0, 'fallback')).toBe(0);
            expect(fallbackIfEmpty(1, 'fallback')).toBe(1);
            expect(fallbackIfEmpty('string', 'fallback')).toBe('string');
            expect(fallbackIfEmpty({}, 'fallback')).toEqual({});
        });

        it('should return fallback if value is empty', () => {
            expect(fallbackIfEmpty('null', {})).toBe('null');
            expect(fallbackIfEmpty(Infinity, {})).toEqual({});
            expect(fallbackIfEmpty(NaN, 'fallback')).toBe('fallback');
            expect(fallbackIfEmpty(null, 'fallback')).toBe('fallback');
            expect(fallbackIfEmpty('  ', 'fallback')).toBe('fallback');
            expect(fallbackIfEmpty('', 'fallback')).toBe('fallback');
        });
    });

    describe('[TEST]: Common utils downloadFile', () => {
        let link: HTMLAnchorElement;

        const file: FileToDownloadInfo = {
            blob: new Blob(['text-file']),
            name: 'text',
            extension: 'txt'
        };

        beforeEach(() => {
            link = { click: jest.fn() } as unknown as HTMLAnchorElement;
        });

        it('should throw error if both file name and extension not provided', () => {
            const invalidFile: FileToDownloadInfo = {
                blob: new Blob(),
                name: null,
                extension: null
            };

            expect(() => downloadFile(invalidFile)).toThrow('File name or file extension must be provided');
        });

        it('should create objectUrl from input blob', () => {
            jest.spyOn(document, 'createElement').mockImplementation(() => link);
            downloadFile(file);

            // eslint-disable-next-line @typescript-eslint/unbound-method
            expect(window.URL.createObjectURL).toHaveBeenCalledTimes(1);
        });

        it('should correct build file name', () => {
            jest.spyOn(document, 'createElement').mockImplementation(() => link);
            downloadFile(file);
            expect(link.download).toBe('text.txt');
        });

        it('should correct build file name without extension', () => {
            jest.spyOn(document, 'createElement').mockImplementation(() => link);

            downloadFile({
                blob: new Blob(['text-file']),
                name: 'text'
            });

            expect(link.download).toBe('text');
        });

        it('should correct build file name without input name', () => {
            jest.spyOn(document, 'createElement').mockImplementation(() => link);

            downloadFile({
                blob: new Blob(['text-file']),
                extension: 'txt'
            });

            expect(link.download).toBe('txt');
        });

        it('should create download link', () => {
            jest.spyOn(document, 'createElement').mockImplementation(() => link);
            downloadFile(file);
            expect(link.href).toBeDefined();
        });

        it('should download the valid file', () => {
            jest.spyOn(document, 'createElement').mockImplementation(() => link);
            downloadFile(file);

            // eslint-disable-next-line @typescript-eslint/unbound-method
            expect(link.click).toHaveBeenCalledTimes(1);
        });

        it('should try parse JSON', () => {
            expect(tryParseJson('{}')).toEqual({});
            expect(tryParseJson('{ "a": 1 }')).toEqual({ a: 1 });
            expect(tryParseJson('"text"')).toBe('text');
            expect(tryParseJson('null')).toBeNull();
            expect(tryParseJson('true')).toBe(true);
            expect(tryParseJson('[ 1, { "a": 1, "b": "b" }, true, null, "b" ]')).toEqual([
                1,
                { a: 1, b: 'b' },
                true,
                null,
                'b'
            ]);
            expect(tryParseJson('qwerty')).toBeUndefined();
            expect(tryParseJson('{ a: 1 }')).toBeUndefined();

            const plain: string = '{ checked: true }';

            expect(tryParseJson<{ checked: boolean }>(plain)?.checked ?? false).toBe(false);
        });

        it('isBoolean should return true if boolean value is provided and false in opposite case', () => {
            expect(isBoolean(true)).toBe(true);
            expect(isBoolean(false)).toBe(true);
            expect(isBoolean('true')).toBe(false);
            expect(isBoolean([])).toBe(false);
            expect(isBoolean(null)).toBe(false);
            expect(isBoolean(42)).toBe(false);
        });
    });
});
