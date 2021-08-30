import { isString } from '@angular-ru/common/string';
import { Nullable } from '@angular-ru/common/typings';

export function getValidHtmlBooleanAttribute(attribute: Nullable<boolean | string>): boolean {
    return (isString(attribute) as boolean) ? true : Boolean(attribute);
}
