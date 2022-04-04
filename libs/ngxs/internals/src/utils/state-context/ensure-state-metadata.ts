import { isFalsy } from '@angular-ru/cdk/utils';
import { NGXS_META_KEY } from '@angular-ru/ngxs/tokens';
import { DataStateClass } from '@angular-ru/ngxs/typings';
import { MetaDataModel, RuntimeSelectorContext } from '@ngxs/store/src/internal/internals';

import { getStateMetadata } from './get-state-metadata';

export function ensureStateMetadata(target: DataStateClass): MetaDataModel {
    if (isFalsy(target.hasOwnProperty(NGXS_META_KEY))) {
        const defaultMetadata: MetaDataModel = {
            name: null,
            actions: {},
            defaults: {},
            path: null,
            makeRootSelector(context: RuntimeSelectorContext): any {
                return context.getStateGetter(defaultMetadata.name);
            },
            children: []
        };

        Object.defineProperty(target, NGXS_META_KEY, { value: defaultMetadata });
    }

    return getStateMetadata(target);
}
