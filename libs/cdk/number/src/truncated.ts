export function truncated(value: number, decimalPlaces: number): number {
    const mantisa: number = 10;
    const numPowerConverter: number = Math.pow(mantisa, decimalPlaces);

    return ~~(value * numPowerConverter) / numPowerConverter;
}
