import { Any } from '@angular-ru/cdk/typings';

import { EncodingType } from './encoding-type';

// eslint-disable-next-line @typescript-eslint/naming-convention
declare const DecompressionStream: Any;

export async function decompress(bytes: ArrayBuffer, encoding: EncodingType = EncodingType.DEFLATE): Promise<string> {
    const decompressionStream: Any = new DecompressionStream(encoding);
    const writable: WritableStream = decompressionStream.writable;
    const writer: WritableStreamDefaultWriter = writable.getWriter();

    // noinspection ES6MissingAwait
    writer.write(bytes);

    // noinspection ES6MissingAwait
    writer.close();

    const stream: ReadableStream = decompressionStream.readable;
    const arrayBuffer: ArrayBuffer = await new Response(stream).arrayBuffer();

    return new TextDecoder().decode(arrayBuffer);
}
