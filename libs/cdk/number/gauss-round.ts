const mantisaDigits: number = 10;
const fractionDigits: number = 8;
const epsilon: number = 1e-8;
const bias: number = 0.5;
const gaussPointer: number = 2;

export function gaussRound(num: number, decimalPlaces: number = 0): number {
    const mantisa: number = Math.pow(mantisaDigits, decimalPlaces);
    const numberValue: number = Number(
        (decimalPlaces ? num * mantisa : num).toFixed(fractionDigits),
    );
    const integerValue: number = Math.floor(numberValue);
    const decimalPointValue: number = numberValue - integerValue;
    const gaussPointCondition: boolean =
        decimalPointValue > bias - epsilon && decimalPointValue < bias + epsilon;

    if (gaussPointCondition) {
        return (
            (integerValue % gaussPointer === 0 ? integerValue : integerValue + 1) /
            mantisa
        );
    } else {
        return Math.round(numberValue) / mantisa;
    }
}
