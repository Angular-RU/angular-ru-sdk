import {NGXS_DATA_META} from '@angular-ru/ngxs/tokens';
import {DataStateClass, NgxsRepositoryMeta} from '@angular-ru/ngxs/typings';

export function getRepository(target: DataStateClass): NgxsRepositoryMeta {
    return target[NGXS_DATA_META]!;
}
