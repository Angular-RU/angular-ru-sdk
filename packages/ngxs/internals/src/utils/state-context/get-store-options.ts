import { Any } from '@angular-ru/common/typings';
import { DataStateClass } from '@angular-ru/ngxs/typings';
import { StoreOptions } from '@ngxs/store/src/symbols';

export function getStoreOptions(stateClass: DataStateClass): StoreOptions<Any> {
    return stateClass['NGXS_OPTIONS_META']! ?? { name: '' };
}
