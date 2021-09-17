export function arrayBufferToBase64(arrayBuffer: ArrayBuffer): string {
    return window.btoa(String.fromCharCode(...new Uint8Array(arrayBuffer)));
}
