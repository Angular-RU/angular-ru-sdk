import {checkValueIsEmpty} from './check-value-is-empty';

export function checkEveryValueIsEmpty(...values: any[]): boolean {
    return values.every((element: any): element is boolean => checkValueIsEmpty(element));
}
