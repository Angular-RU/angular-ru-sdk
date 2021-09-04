import { Any } from '@angular-ru/cdk/typings';
import { checkValueIsEmpty } from '@angular-ru/cdk/utils';

export function replaceWithNull<T>(value: T): T {
    return JSON.parse(
        JSON.stringify(value, function (_: string, elem: Any): Any {
            if (typeof elem === 'object') {
                return elem;
            }

            return checkValueIsEmpty(elem) ? null : elem;
        })
    );
}
