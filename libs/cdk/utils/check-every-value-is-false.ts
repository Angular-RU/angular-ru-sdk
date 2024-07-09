import {isFalse} from './is-false';

export function checkEveryValueIsFalse(...values: any[]): boolean {
    return values.length === 0
        ? false
        : values.every((element: any): element is boolean => isFalse(element));
}
