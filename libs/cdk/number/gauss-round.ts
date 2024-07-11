const mantisaDigits = 10;
const fractionDigits = 8;
const epsilon = 1e-8;
const bias = 0.5;
const gaussPointer = 2;

export function gaussRound(num: number, decimalPlaces = 0): number {
    const mantisa: number = mantisaDigits ** decimalPlaces;
    const numberValue = Number(
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
    }

    return Math.round(numberValue) / mantisa;
}
