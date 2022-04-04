import { checkValueIsEmpty } from '@angular-ru/cdk/utils';

export function replaceWithNull<T>(value: T): T {
    return JSON.parse(
        JSON.stringify(value, (_: string, element: any): any => {
            if (typeof element === 'object') {
                return element;
            }

            return checkValueIsEmpty(element) ? null : element;
        })
    );
}
