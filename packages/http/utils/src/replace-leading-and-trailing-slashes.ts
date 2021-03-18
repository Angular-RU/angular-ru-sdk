import { EmptyValue } from '@angular-ru/common/typings';
import { checkValueIsEmpty } from '@angular-ru/common/utils';

export function replaceLeadingAndTrailingSlashes(inputString: string | EmptyValue): string {
    const pattern: RegExp = new RegExp('^\\/+|\\/+$', 'g');
    return checkValueIsEmpty(inputString) ? '' : inputString.trim().replace(pattern, '');
}
