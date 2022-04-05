export function toBase64<T>(pojo: Record<string, unknown> | T): string {
    // eslint-disable-next-line deprecation/deprecation
    return window.btoa(unescape(encodeURIComponent(JSON.stringify(pojo))));
}
