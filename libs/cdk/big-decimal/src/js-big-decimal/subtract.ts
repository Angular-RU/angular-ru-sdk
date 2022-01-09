import { Any } from '@angular-ru/cdk/typings';

import { add } from './add';

export function subtract(number1: Any, number2: Any): string {
    const a: string = number1.toString();
    let b: string = number2.toString();

    b = negate(b);

    return add(a, b);
}

export function negate(number: string): string {
    let result: string = '';

    if (number[0] === '-') {
        result = number.substr(1);
    } else {
        result = `-${number}`;
    }

    return result;
}
