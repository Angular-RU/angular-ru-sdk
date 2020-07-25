import { Any } from '@angular-ru/common/typings';

export function $any(value: Any | unknown): Any {
    return value as Any;
}
