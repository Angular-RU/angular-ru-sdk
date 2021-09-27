import { Any } from '../../dist/library/typings';

export function isBoolean(value: Any): value is boolean {
    return typeof value === 'boolean';
}
