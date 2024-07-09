import {isString} from '@angular-ru/cdk/string';
import {Nullable} from '@angular-ru/cdk/typings';

export function getValidHtmlBooleanAttribute(
    attribute: Nullable<boolean | string>,
): boolean {
    return isString(attribute) ? true : Boolean(attribute);
}
