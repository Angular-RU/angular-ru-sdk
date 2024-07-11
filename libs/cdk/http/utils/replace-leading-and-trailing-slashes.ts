import {EmptyValue} from '@angular-ru/cdk/typings';
import {checkValueIsEmpty} from '@angular-ru/cdk/utils';

export function replaceLeadingAndTrailingSlashes(
    inputString: EmptyValue | string,
): string {
    const pattern = new RegExp('^\\/+|\\/+$', 'g');

    return checkValueIsEmpty(inputString)
        ? ''
        : inputString.trim().replaceAll(pattern, '');
}
