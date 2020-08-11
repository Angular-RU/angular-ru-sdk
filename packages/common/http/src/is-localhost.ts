export function isLocalhost(url: string = location.href): boolean {
    console.log('href', location.href)
    return url.includes('://localhost') || url.includes('://127.0.0.1') || url.includes('://0.0.0.0');
}
