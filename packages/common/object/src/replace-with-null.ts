import { Any } from '@angular-ru/common/typings';

export function replaceWithNull<T>(value: T): T {
    return JSON.parse(
        JSON.stringify(value, function (_: string, elem: Any): Any {
            if (typeof elem === 'object') {
                return elem;
            }
            const val: string = typeof elem === 'string' ? elem.trim() : elem;
            const isEmpty: boolean = [undefined, null, NaN, '', 'null', Infinity].includes(val);
            return isEmpty ? null : elem;
        })
    );
}
