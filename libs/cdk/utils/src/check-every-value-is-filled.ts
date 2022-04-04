import { checkValueIsFilled } from './check-value-is-filled';

export function checkEveryValueIsFilled(...values: any[]): boolean {
    return values.every((element: any): element is boolean => checkValueIsFilled<boolean>(element));
}
