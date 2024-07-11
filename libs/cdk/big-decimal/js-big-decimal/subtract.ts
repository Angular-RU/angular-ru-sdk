import {add} from './add';

export function subtract(number1: number | string, number2: number | string): string {
    const a: string = number1.toString();
    let b: string = number2.toString();

    b = negate(b);

    return add(a, b);
}

export function negate(number: string): string {
    let result = '';

    if (number.startsWith('-')) {
        result = number.slice(1);
    } else {
        result = `-${number}`;
    }

    return result;
}
