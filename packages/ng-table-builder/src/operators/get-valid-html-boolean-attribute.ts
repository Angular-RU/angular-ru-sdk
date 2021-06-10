import { isString } from '@angular-ru/common/string';

export function getValidHtmlBooleanAttribute(attribute: boolean | string | null | undefined): boolean {
    return (isString(attribute) as boolean) ? true : Boolean(attribute);
}
