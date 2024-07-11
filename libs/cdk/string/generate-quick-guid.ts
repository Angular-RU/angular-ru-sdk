export function generateQuickGuid(): string {
    const radix = 36;
    const startWith = 2;
    const endWith = 15;

    return (
        Math.random().toString(radix).substring(startWith, endWith) +
        Math.random().toString(radix).substring(startWith, endWith)
    );
}
