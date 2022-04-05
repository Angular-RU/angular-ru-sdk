import { add } from './add';

export function subtract(number1: string | number, number2: string | number): string {
    const a: string = number1.toString();
    let b: string = number2.toString();

    b = negate(b);

    return add(a, b);
}

export function negate(number: string): string {
    let result: string = '';

    if (number[0] === '-') {
        // eslint-disable-next-line deprecation/deprecation
        result = number.substr(1);
    } else {
        result = `-${number}`;
    }

    return result;
}
