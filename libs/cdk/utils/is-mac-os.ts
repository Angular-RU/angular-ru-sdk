export function isMacOS(navigatorRef: Navigator = navigator): boolean {
    return navigatorRef.userAgent.includes('Mac');
}
