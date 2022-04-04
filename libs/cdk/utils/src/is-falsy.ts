import { isTruthy } from './is-truthy';

export function isFalsy(value: any): boolean {
    return !isTruthy(value);
}
