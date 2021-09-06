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
    isIE,
    isNil,
    isNotNil,
    parseXmlFromString,
    serializeXmlToString,
    tryParseJson
} from '@angular-ru/cdk/utils';
import { FileToDownloadInfo } from '@angular-ru/cdk/utils/download-file';

describe('[TEST]: Common utils', () => {
    it('$any/$cast', () => {
        expect(parseInt($any(1) + $cast('2'))).toEqual(12);
    });

    it('is null or undefined', () => {
        expect(isNil(null)).toEqual(true);
        expect(isNil(undefined)).toEqual(true);
        expect(isNil('')).toEqual(false);
        expect(isNil(0)).toEqual(false);
    });

    it('is not null or undefined', () => {
        expect(isNotNil(0)).toEqual(true);
        expect(isNotNil('')).toEqual(true);
        expect(isNotNil(null)).toEqual(false);
        expect(isNotNil(undefined)).toEqual(false);
    });

    it('is empty value', () => {
        expect(checkValueIsEmpty(0)).toEqual(false);
        expect(checkValueIsEmpty('x')).toEqual(false);
        expect(checkValueIsEmpty('null')).toEqual(false);
        expect(checkValueIsEmpty('')).toEqual(true);
        expect(checkValueIsEmpty('    ')).toEqual(true);
        expect(checkValueIsEmpty(NaN)).toEqual(true);
        expect(checkValueIsEmpty(undefined)).toEqual(true);
        expect(checkValueIsEmpty(null)).toEqual(true);
    });

    it('is filled value', () => {
        expect(checkValueIsFilled(null)).toEqual(false);
        expect(checkValueIsFilled(NaN)).toEqual(false);
        expect(checkValueIsFilled(Infinity)).toEqual(false);
        expect(checkValueIsFilled(undefined)).toEqual(false);
        expect(checkValueIsFilled('    ')).toEqual(false);
        expect(checkValueIsFilled(false)).toEqual(true);
        expect(checkValueIsFilled(true)).toEqual(true);
        expect(checkValueIsFilled(0)).toEqual(true);
        expect(checkValueIsFilled('x')).toEqual(true);
        expect(checkValueIsFilled('null')).toEqual(true);
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

        expect(count).toEqual(3);
    });

    it('isIE', () => {
        expect(isIE('Internet Explorer 9 (MSIE 9.0)')).toEqual(true);
        expect(isIE('Chrome')).toEqual(false);
    });

    it('simple parse xml', () => {
        const xml = parseXmlFromString('<hello>123</hello>');
        expect(xml.querySelector('hello')?.textContent).toEqual('123');
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

        expect(xml.querySelector('a b')?.textContent).toEqual('1');
        expect(xml.querySelector('c')?.textContent).toEqual('2');
    });

    it('xml to string', () => {
        const xml = parseXmlFromString('<hello>123</hello>');
        expect(serializeXmlToString(xml)).toEqual('<hello>123</hello>');
    });

    it('checkEveryValueIsEmpty should return false for a set of filled values', () =>
        expect(checkEveryValueIsEmpty(42, 'hello world', {})).toEqual(false));

    it('checkEveryValueIsEmpty should return false for a set of values containing filled values', () =>
        expect(checkEveryValueIsEmpty(42, 'hello world', null)).toEqual(false));

    it('checkEveryValueIsEmpty should return false for a set of empty values', () =>
        expect(checkEveryValueIsEmpty('', undefined, null)).toEqual(true));

    it('checkSomeValueIsEmpty should return false for a set of filled values', () =>
        expect(checkSomeValueIsEmpty(42, 'hello world', {})).toEqual(false));

    it('checkSomeValueIsEmpty should return true for a set of values containing empty values', () =>
        expect(checkSomeValueIsEmpty(42, 'hello world', null)).toEqual(true));

    it('checkSomeValueIsEmpty should return true for a set of empty values', () =>
        expect(checkSomeValueIsEmpty('', undefined, null)).toEqual(true));
});

describe('[TEST]: checkSomeValueIsTrue', () => {
    it('should return true if any item has value: "true"', () => {
        expect(checkSomeValueIsTrue(true)).toEqual(true);
        expect(checkSomeValueIsTrue(true, true)).toEqual(true);
        expect(checkSomeValueIsTrue([], true)).toEqual(true);
        expect(checkSomeValueIsTrue('', undefined, null, true)).toEqual(true);
        expect(checkSomeValueIsTrue('a', 13, {}, true)).toEqual(true);
    });

    it('should return false if no item has value: "true"', () => {
        expect(checkSomeValueIsTrue()).toEqual(false);
        expect(checkSomeValueIsTrue(false)).toEqual(false);
        expect(checkSomeValueIsTrue(false, false)).toEqual(false);
        expect(checkSomeValueIsTrue([])).toEqual(false);
        expect(checkSomeValueIsTrue([true])).toEqual(false);
        expect(checkSomeValueIsTrue('', undefined, null)).toEqual(false);
        expect(checkSomeValueIsTrue('a', 13, {})).toEqual(false);
    });
});

describe('[TEST]: checkSomeValueIsFalse', () => {
    it('should return true if any item has value: "false"', () => {
        expect(checkSomeValueIsFalse(false)).toEqual(true);
        expect(checkSomeValueIsFalse(false, false)).toEqual(true);
        expect(checkSomeValueIsFalse([], false)).toEqual(true);
        expect(checkSomeValueIsFalse('', undefined, null, false)).toEqual(true);
        expect(checkSomeValueIsFalse('a', 13, {}, false)).toEqual(true);
    });

    it('should return false if no item has value: "false"', () => {
        expect(checkSomeValueIsFalse()).toEqual(false);
        expect(checkSomeValueIsFalse(true)).toEqual(false);
        expect(checkSomeValueIsFalse(true, true)).toEqual(false);
        expect(checkSomeValueIsFalse([])).toEqual(false);
        expect(checkSomeValueIsFalse([false])).toEqual(false);
        expect(checkSomeValueIsFalse('', undefined, null)).toEqual(false);
        expect(checkSomeValueIsFalse('a', 13, {})).toEqual(false);
    });
});

describe('[TEST]: checkEveryValueIsTrue', () => {
    it('should return true if every item has value: "true"', () => {
        expect(checkEveryValueIsTrue(true)).toEqual(true);
        expect(checkEveryValueIsTrue(true, true)).toEqual(true);
        expect(checkEveryValueIsTrue(true, true, true)).toEqual(true);
    });

    it('should return false if not every item has value: "true"', () => {
        expect(checkEveryValueIsTrue()).toEqual(false);
        expect(checkEveryValueIsTrue(false)).toEqual(false);
        expect(checkEveryValueIsTrue(false, false)).toEqual(false);
        expect(checkEveryValueIsTrue(false, true)).toEqual(false);
        expect(checkEveryValueIsTrue([])).toEqual(false);
        expect(checkEveryValueIsTrue([true])).toEqual(false);
        expect(checkEveryValueIsTrue('', undefined, null, true)).toEqual(false);
        expect(checkEveryValueIsTrue('a', 13, {}, true)).toEqual(false);
        expect(checkEveryValueIsTrue(true, true, {})).toEqual(false);
        expect(checkEveryValueIsTrue(true, true, 'a')).toEqual(false);
        expect(checkEveryValueIsTrue(true, true, 13)).toEqual(false);
    });
});

describe('[TEST]: checkEveryValueIsFalse', () => {
    it('should return true if every item has value: "false"', () => {
        expect(checkEveryValueIsFalse(false)).toEqual(true);
        expect(checkEveryValueIsFalse(false, false)).toEqual(true);
        expect(checkEveryValueIsFalse(false, false, false)).toEqual(true);
    });

    it('should return false if not every item has value: "false"', () => {
        expect(checkEveryValueIsFalse()).toEqual(false);
        expect(checkEveryValueIsFalse(true)).toEqual(false);
        expect(checkEveryValueIsFalse(true, true)).toEqual(false);
        expect(checkEveryValueIsFalse(false, true)).toEqual(false);
        expect(checkEveryValueIsFalse([])).toEqual(false);
        expect(checkEveryValueIsFalse([false])).toEqual(false);
        expect(checkEveryValueIsFalse('', undefined, null, false)).toEqual(false);
        expect(checkEveryValueIsFalse('a', 13, {}, false)).toEqual(false);
        expect(checkEveryValueIsFalse(false, false, {})).toEqual(false);
        expect(checkEveryValueIsFalse(false, false, 'a')).toEqual(false);
        expect(checkEveryValueIsFalse(false, false, 13)).toEqual(false);
    });
});

describe('[TEST]: fallbackIfEmpty', () => {
    it('should return value if it is filled', () => {
        expect(fallbackIfEmpty(false, 'fallback')).toEqual(false);
        expect(fallbackIfEmpty(true, 'fallback')).toEqual(true);
        expect(fallbackIfEmpty([], 'fallback')).toEqual([]);
        expect(fallbackIfEmpty(0, 'fallback')).toEqual(0);
        expect(fallbackIfEmpty(1, 'fallback')).toEqual(1);
        expect(fallbackIfEmpty('string', 'fallback')).toEqual('string');
        expect(fallbackIfEmpty({}, 'fallback')).toEqual({});
    });

    it('should return fallback if value is empty', () => {
        expect(fallbackIfEmpty('null', {})).toEqual('null');
        expect(fallbackIfEmpty(Infinity, {})).toEqual({});
        expect(fallbackIfEmpty(NaN, 'fallback')).toEqual('fallback');
        expect(fallbackIfEmpty(null, 'fallback')).toEqual('fallback');
        expect(fallbackIfEmpty('  ', 'fallback')).toEqual('fallback');
        expect(fallbackIfEmpty('', 'fallback')).toEqual('fallback');
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
        window.URL.createObjectURL = jest.fn((blob: Blob) => `${blob}`);
        window.URL.revokeObjectURL = jest.fn();
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
        expect(window.URL.createObjectURL).toHaveBeenCalledTimes(1);
    });

    it('should correct build file name', () => {
        jest.spyOn(document, 'createElement').mockImplementation(() => link);
        downloadFile(file);
        expect(link.download).toEqual('text.txt');
    });

    it('should correct build file name without extension', () => {
        jest.spyOn(document, 'createElement').mockImplementation(() => link);

        downloadFile({
            blob: new Blob(['text-file']),
            name: 'text'
        });

        expect(link.download).toEqual('text');
    });

    it('should correct build file name without input name', () => {
        jest.spyOn(document, 'createElement').mockImplementation(() => link);

        downloadFile({
            blob: new Blob(['text-file']),
            extension: 'txt'
        });

        expect(link.download).toEqual('txt');
    });

    it('should create download link', () => {
        jest.spyOn(document, 'createElement').mockImplementation(() => link);
        downloadFile(file);
        expect(link.href).toBeDefined();
    });

    it('should download the valid file', () => {
        jest.spyOn(document, 'createElement').mockImplementation(() => link);
        downloadFile(file);
        expect(link.click).toHaveBeenCalledTimes(1);
    });

    it('should try parse JSON', () => {
        expect(tryParseJson('{}')).toEqual({});
        expect(tryParseJson('{ "a": 1 }')).toEqual({ a: 1 });
        expect(tryParseJson('"text"')).toEqual('text');
        expect(tryParseJson('null')).toEqual(null);
        expect(tryParseJson('true')).toEqual(true);
        expect(tryParseJson('[ 1, { "a": 1, "b": "b" }, true, null, "b" ]')).toEqual([
            1,
            { a: 1, b: 'b' },
            true,
            null,
            'b'
        ]);
        expect(tryParseJson('qwerty')).toEqual(undefined);
        expect(tryParseJson('{ a: 1 }')).toEqual(undefined);

        const plain: string = '{ checked: true }';
        expect(tryParseJson<{ checked: boolean }>(plain)?.checked ?? false).toBe(false);
    });
});
