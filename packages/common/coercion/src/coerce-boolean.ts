import { InputBoolean } from '@angular-ru/common/typings';

export function coerceBoolean(value: InputBoolean): boolean {
    return typeof value === 'string' ? value?.trim() === '' || value?.trim() !== 'false' : Boolean(value);
}
