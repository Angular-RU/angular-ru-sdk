import {isTruthy} from './is-truthy';

export function isFalsy(value: any | unknown): boolean {
    return !isTruthy(value);
}
