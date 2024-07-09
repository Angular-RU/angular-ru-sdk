import {Fn} from '@angular-ru/cdk/typings';
import {NGXS_DATA_EXCEPTIONS} from '@angular-ru/ngxs/tokens';

export function validateAction(
    target: Fn,
    descriptor: TypedPropertyDescriptor<any>,
): void {
    const isStaticMethod: boolean = target.hasOwnProperty('prototype');

    if (isStaticMethod) {
        throw new Error(NGXS_DATA_EXCEPTIONS.NGXS_DATA_STATIC_ACTION);
    }

    if (descriptor === undefined) {
        throw new Error(NGXS_DATA_EXCEPTIONS.NGXS_DATA_ACTION);
    }
}
