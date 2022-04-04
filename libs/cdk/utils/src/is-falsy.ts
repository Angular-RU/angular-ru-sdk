import { isTruthy } from './is-truthy';

export function isFalsy(value: unknown | any): boolean {
    return !isTruthy(value);
}
