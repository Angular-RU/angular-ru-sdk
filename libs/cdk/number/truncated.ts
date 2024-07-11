export function truncated(value: number, decimalPlaces: number): number {
    const mantisa = 10;
    const numPowerConverter: number = mantisa ** decimalPlaces;

    return ~~(value * numPowerConverter) / numPowerConverter;
}
