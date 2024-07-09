import {
    arrayBufferToBase64,
    base64ToArrayBuffer,
    compress,
    decodeBase64ToUnicode,
    decompress,
    encodeUnicodeToBase64,
} from '@angular-ru/cdk/stream';

describe('[TEST]: Stream API', () => {
    const base64 = 'aGVsbG8gd29ybGQ=';

    it('compress', async () => {
        const buffer: ArrayBuffer = await compress('hello world');
        const result: string = arrayBufferToBase64(buffer);

        expect(result).toEqual(base64);
    });

    it('decompress', async () => {
        const buffer: ArrayBuffer = base64ToArrayBuffer(base64);
        const result: string = await decompress(buffer);

        expect(result).toBe('hello world');
    });

    describe('base64 with Unicode', () => {
        // eslint-disable-next-line no-cyrillic-string/no-cyrillic-string
        const unicodeCyrillic: string = 'абвГДЕ';
        const b64: string = 'YWJjQUJDe31bXSEsLiIvPyQlXiYqKClfKy09YSBiIGMwMTIz';
        const unicode: string = 'abcABC{}[]!,."/?$%^&*()_+-=a b c0123';
        const b64Cyrillic: string = '0LDQsdCy0JPQlNCV';

        describe('decodeBase64ToUnicode', () => {
            it('should decode b64 into unicode', async () => {
                const result: string = decodeBase64ToUnicode(b64);

                expect(result).toEqual(unicode);
            });

            it('should decode b64 with cyrillic symbols into unicode', async () => {
                const result: string = decodeBase64ToUnicode(b64Cyrillic);

                expect(result).toEqual(unicodeCyrillic);
            });

            it('should correctly decode symbols which > 1 byte', async () => {
                const result: string = decodeBase64ToUnicode('4pyT');

                expect(result).toBe('✓');
            });
        });

        describe('encodeUnicodeToBase64', () => {
            it('should encode unicode to base64', async () => {
                const result: string = encodeUnicodeToBase64(unicode);

                expect(result).toEqual(b64);
            });

            it('should encode unicode with cyrillic into b64', async () => {
                const result: string = encodeUnicodeToBase64(unicodeCyrillic);

                expect(result).toEqual(b64Cyrillic);
            });

            it('should correctly encode symbols which > 1 byte', async () => {
                const result: string = encodeUnicodeToBase64('✓');

                expect(result).toBe('4pyT');
            });
        });
    });
});
