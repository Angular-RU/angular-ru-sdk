export function encodeUnicodeToBase64(str: string): any {
    return window.btoa(
        encodeURIComponent(str).replaceAll(
            /%([\dA-F]{2})/g,
            // eslint-disable-next-line unicorn/prefer-code-point
            (_match: any, p1: any): any => String.fromCharCode(parseInt(p1, 16)),
        ),
    );
}
