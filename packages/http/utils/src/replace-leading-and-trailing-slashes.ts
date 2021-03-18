import { EmptyValue } from '@angular-ru/common/typings';
import { checkValueIsEmpty } from '@angular-ru/common/utils';

export function replaceLeadingAndTrailingSlashes(inputString: string | EmptyValue): string {
    if (checkValueIsEmpty(inputString)) {
        return '';
    }
    const pattern: RegExp = new RegExp('^\\/+|\\/+$', 'g');
    return inputString.trim().replace(pattern, '');
}
