import {isFalse} from './is-false';

export function checkSomeValueIsFalse(...values: any[]): boolean {
    return values.some((element: any): element is boolean => isFalse(element));
}
