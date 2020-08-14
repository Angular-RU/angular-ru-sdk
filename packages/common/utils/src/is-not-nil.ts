import { isNil } from './is-nil';

export function isNotNil<T>(value: T | null | undefined): value is T {
    return !isNil(value);
}
