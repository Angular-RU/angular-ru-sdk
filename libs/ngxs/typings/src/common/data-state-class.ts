/* istanbul ignore next */

import { NGXS_DATA_META, NGXS_META_KEY } from '@angular-ru/ngxs/tokens';
import { MetaDataModel, StateClassInternal } from '@ngxs/store/src/internal/internals';

import { NgxsRepositoryMeta } from './repository';

export interface DataStateClass<T = any, U = any> extends StateClassInternal<T, U> {
    [NGXS_DATA_META]?: NgxsRepositoryMeta;
    [NGXS_META_KEY]?: MetaDataModel;
}

export type StateClassDecorator = (stateClass: DataStateClass) => void;

export type StateArgumentDecorator = (
    stateClass: Object,
    propertyKey: string | symbol,
    parameterIndex: number
) => void;
