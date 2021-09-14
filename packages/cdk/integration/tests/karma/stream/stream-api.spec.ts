import { arrayBufferToBase64, base64ToArrayBuffer, compress, decompress } from '@angular-ru/cdk/stream';

describe('[TEST]: Stream API', () => {
    const base64: string = 'eJzLSM3JyVcozy/KSQEAGgsEXQ==';

    it('compress', async () => {
        const buffer: ArrayBuffer = await compress('hello world');
        const result: string = arrayBufferToBase64(buffer);

        expect(result).toEqual(base64);
    });

    it('decompress', async () => {
        const buffer: ArrayBuffer = base64ToArrayBuffer(base64);
        const result: string = await decompress(buffer);

        expect(result).toEqual('hello world');
    });
});
