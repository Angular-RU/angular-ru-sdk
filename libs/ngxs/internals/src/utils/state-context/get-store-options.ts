import { DataStateClass } from '@angular-ru/ngxs/typings';
import { StoreOptions } from '@ngxs/store/src/symbols';

export function getStoreOptions(stateClass: DataStateClass): StoreOptions<any> {
    return stateClass.NGXS_OPTIONS_META! ?? { name: '' };
}
