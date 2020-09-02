export function base64ToArrayBuffer(base64: string): ArrayBuffer {
    const binaryString: string = window.atob(base64);
    const len: number = binaryString.length;
    const bytes: Uint8Array = new Uint8Array(len);

    for (let i: number = 0; i < len; i++) {
        bytes[i] = binaryString.charCodeAt(i);
    }

    return bytes.buffer;
}
