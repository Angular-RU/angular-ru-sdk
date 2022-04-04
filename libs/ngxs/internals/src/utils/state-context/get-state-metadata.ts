import { NGXS_META_KEY } from '@angular-ru/ngxs/tokens';
import { DataStateClass } from '@angular-ru/ngxs/typings';
import { MetaDataModel } from '@ngxs/store/src/internal/internals';

export function getStateMetadata(target: DataStateClass): MetaDataModel {
    // eslint-disable-next-line @typescript-eslint/no-non-null-asserted-optional-chain
    return (target as any)?.[NGXS_META_KEY]!;
}
