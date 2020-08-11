import { Any } from '@angular-ru/common/typings';

const SPACE_INDENT: number = 4;

export function stringify(value: Any, spaceIndent: number = SPACE_INDENT): string {
    return String(JSON.stringify(value, null, spaceIndent)).toString();
}
