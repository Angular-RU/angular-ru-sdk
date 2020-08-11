export function isIE(userAgent: string = navigator.userAgent): boolean {
    return /edge|msie\s|trident\//i.test(userAgent);
}
