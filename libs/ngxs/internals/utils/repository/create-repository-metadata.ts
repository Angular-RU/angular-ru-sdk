import {DataStateClass, NgxsRepositoryMeta} from '@angular-ru/ngxs/typings';

import {ensureRepository} from './ensure-repository';

/**
 * @description need mutate metadata for correct reference
 */
export function createRepositoryMetadata(target: DataStateClass, stateMeta: any): void {
    const repositoryMeta: NgxsRepositoryMeta = ensureRepository(target);

    repositoryMeta.stateMeta = stateMeta;
}
