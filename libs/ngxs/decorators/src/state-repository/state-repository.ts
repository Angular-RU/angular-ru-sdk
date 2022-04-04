import { deepClone } from '@angular-ru/cdk/object';

import { isNil } from '@angular-ru/cdk/utils';
import {
    buildDefaultsGraph,
    createContext,
    createRepositoryMetadata,
    createStateSelector,
    ensureStateMetadata
} from '@angular-ru/ngxs/internals';
import { NGXS_DATA_EXCEPTIONS } from '@angular-ru/ngxs/tokens';
import { DataStateClass, StateClassDecorator } from '@angular-ru/ngxs/typings';
import { MetaDataModel } from '@ngxs/store/src/internal/internals';

export function StateRepository(): StateClassDecorator {
    return (stateClass: DataStateClass): void => {
        const stateMeta: MetaDataModel = ensureStateMetadata(stateClass);

        if (isNil(stateMeta.name)) {
            throw new Error(NGXS_DATA_EXCEPTIONS.NGXS_DATA_STATE);
        }

        createRepositoryMetadata(stateClass, stateMeta);
        const cloneDefaults: any = buildDefaultsGraph(stateClass);

        defineProperties(stateClass, stateMeta, cloneDefaults);
        createStateSelector(stateClass);
    };
}

function defineProperties(stateClass: DataStateClass, stateMeta: MetaDataModel, cloneDefaults: any): void {
    Object.defineProperties(stateClass.prototype, {
        name: {
            enumerable: true,
            configurable: true,
            value: stateMeta.name
        },
        initialState: {
            enumerable: true,
            configurable: true,
            get(): any {
                // preserve mutation
                return deepClone(cloneDefaults);
            }
        },
        context: createContext(stateClass)
    });
}
