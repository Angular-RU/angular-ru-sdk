export function base64ToArrayBuffer(base64: string): ArrayBuffer {
    const binaryString: string = window.atob(base64);
    const binLength: number = binaryString.length;
    const bytes: Uint8Array = new Uint8Array(binLength);

    for (let i: number = 0; i < binLength; i++) {
        // eslint-disable-next-line unicorn/prefer-code-point
        bytes[i] = binaryString.charCodeAt(i);
    }

    return bytes.buffer;
}
