import {EncodingType} from './encoding-type';

// eslint-disable-next-line @typescript-eslint/naming-convention
declare const CompressionStream: any;

export async function compress(
    text: string,
    encoding: EncodingType = EncodingType.DEFLATE,
): Promise<ArrayBuffer> {
    const byteArray: Uint8Array = new TextEncoder().encode(text);
    const stream: any = new CompressionStream(encoding);
    const readable: ReadableStream = stream.readable;
    const writable: WritableStream = stream.writable;
    const writer: WritableStreamDefaultWriter = writable.getWriter();

    // noinspection ES6MissingAwait
    writer.write(byteArray);
    // noinspection ES6MissingAwait
    writer.close();

    return new Response(readable).arrayBuffer();
}
