import {DataStateClass} from '@angular-ru/ngxs/typings';

export function getStoreOptions(stateClass: DataStateClass): any {
    return (stateClass as any).NGXS_OPTIONS_META! ?? {name: ''};
}
