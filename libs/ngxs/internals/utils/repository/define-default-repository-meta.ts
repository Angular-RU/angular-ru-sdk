import {NGXS_DATA_META} from '@angular-ru/ngxs/tokens';
import {DataStateClass} from '@angular-ru/ngxs/typings';

export function defineDefaultRepositoryMeta(target: DataStateClass): void {
    Object.defineProperty(target, NGXS_DATA_META, {
        writable: true,
        configurable: true,
        enumerable: true,
        value: {stateMeta: null, operations: {}, stateClass: target},
    });
}
