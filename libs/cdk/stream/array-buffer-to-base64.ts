export function arrayBufferToBase64(arrayBuffer: ArrayBuffer): string {
    // eslint-disable-next-line unicorn/prefer-code-point
    return window.btoa(String.fromCharCode(...new Uint8Array(arrayBuffer)));
}
