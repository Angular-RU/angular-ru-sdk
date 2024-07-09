import {isTrue} from './is-true';

export function checkEveryValueIsTrue(...values: any[]): boolean {
    return values.length === 0
        ? false
        : values.every((element: any): element is boolean => isTrue(element));
}
