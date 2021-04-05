import {
    $any,
    $cast,
    isNil,
    isNotNil,
    checkValueIsEmpty,
    serializeXmlToString,
    detectChanges,
    isIE,
    parseXmlFromString,
    checkSomeValueIsEmpty,
    checkEveryValueIsEmpty,
    downloadFile
} from '@angular-ru/common/utils';
import { ChangeDetectorRef } from '@angular/core';
import { checkValueIsFilled } from '../../../dist/library/utils';
import { FileToDownloadInfo } from '../../../dist/library/utils/download-file';

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
        expect(checkValueIsEmpty('')).toEqual(true);
        expect(checkValueIsEmpty('null')).toEqual(true);
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

describe('[TEST]: Common utils downloadFile', () => {
    let link: HTMLAnchorElement;

    const file: FileToDownloadInfo = {
        blob: new Blob(['text-file']),
        name: 'text',
        extension: 'txt'
    };

    beforeEach(() => {
        link = <HTMLAnchorElement>(<unknown>{
            click: jest.fn()
        });
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
        const file: FileToDownloadInfo = {
            blob: new Blob(['text-file']),
            name: 'text'
        };
        jest.spyOn(document, 'createElement').mockImplementation(() => link);
        downloadFile(file);
        expect(link.download).toEqual('text');
    });

    it('should correct build file name without input name', () => {
        const file: FileToDownloadInfo = {
            blob: new Blob(['text-file']),
            extension: 'txt'
        };
        jest.spyOn(document, 'createElement').mockImplementation(() => link);
        downloadFile(file);
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
});
