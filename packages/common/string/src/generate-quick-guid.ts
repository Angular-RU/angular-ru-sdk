export function generateQuickGuid(): string {
    const radix: number = 36;
    const startWith: number = 2;
    const endWith: number = 15;

    return (
        Math.random().toString(radix).substring(startWith, endWith) +
        Math.random().toString(radix).substring(startWith, endWith)
    );
}
