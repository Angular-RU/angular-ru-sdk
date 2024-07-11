/* istanbul ignore next */

import {NGXS_DATA_META, NGXS_META_KEY} from '@angular-ru/ngxs/tokens';
import {ɵStateClass as StateClass} from '@ngxs/store/internals/symbols';

import {NgxsRepositoryMeta} from './repository';

export interface DataStateClass extends StateClass {
    [NGXS_DATA_META]?: NgxsRepositoryMeta;
    [NGXS_META_KEY]?: any;
}

export type StateClassDecorator = (stateClass: DataStateClass) => void;

export type StateArgumentDecorator = (
    stateClass: Record<any, any>,
    propertyKey: string | symbol,
    parameterIndex: number,
) => void;
