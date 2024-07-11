export function toBase64<T>(pojo: Record<string, unknown> | T): string {
    return window.btoa(unescape(encodeURIComponent(JSON.stringify(pojo))));
}
