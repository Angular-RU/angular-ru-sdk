import { Any } from '@angular-ru/common/typings';
import { isFalsy, isNil } from '@angular-ru/common/utils';
import { ensureStateMetadata, getRepository, STORAGE_INIT_EVENT } from '@angular-ru/ngxs/internals';
import { ensureProviders, registerStorageProviders } from '@angular-ru/ngxs/storage';
import { NGXS_DATA_EXCEPTIONS } from '@angular-ru/ngxs/tokens';
import { DataStateClass, NgxsRepositoryMeta, PersistenceProvider, ProviderOptions } from '@angular-ru/ngxs/typings';
import { MetaDataModel } from '@ngxs/store/src/internal/internals';

export function Persistence(options?: ProviderOptions): Any {
    return (stateClass: DataStateClass): void => {
        const stateMeta: MetaDataModel = ensureStateMetadata(stateClass);
        const repositoryMeta: NgxsRepositoryMeta = getRepository(stateClass);
        const isUndecoratedClass: boolean = isNil(stateMeta.name) || isNil(repositoryMeta);

        if (isUndecoratedClass) {
            throw new Error(NGXS_DATA_EXCEPTIONS.NGXS_PERSISTENCE_STATE);
        }

        STORAGE_INIT_EVENT.events$.subscribe((): void => {
            if (isFalsy(STORAGE_INIT_EVENT.firstInitialized)) {
                STORAGE_INIT_EVENT.firstInitialized = true;
            }

            const providers: PersistenceProvider[] = ensureProviders(repositoryMeta, stateClass, options);
            registerStorageProviders(providers);
        });
    };
}
