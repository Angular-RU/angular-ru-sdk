export function half(dividend: number): number {
    if (typeof dividend === 'number') {
        // eslint-disable-next-line @typescript-eslint/no-magic-numbers
        return dividend / 2;
    } else {
        return NaN;
    }
}
