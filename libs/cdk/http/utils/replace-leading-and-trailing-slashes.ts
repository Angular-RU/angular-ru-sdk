import {EmptyValue} from '@angular-ru/cdk/typings';
import {checkValueIsEmpty} from '@angular-ru/cdk/utils';

export function replaceLeadingAndTrailingSlashes(
    inputString: string | EmptyValue,
): string {
    const pattern: RegExp = new RegExp('^\\/+|\\/+$', 'g');

    return checkValueIsEmpty(inputString) ? '' : inputString.trim().replace(pattern, '');
}
