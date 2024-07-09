import {isTrue} from './is-true';

export function checkSomeValueIsTrue(...values: any[]): boolean {
    return values.some((element: any): element is boolean => isTrue(element));
}
