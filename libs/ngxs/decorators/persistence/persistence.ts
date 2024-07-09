import {isNil} from '@angular-ru/cdk/utils';
import {
    ensureStateMetadata,
    getRepository,
    STORAGE_INITIALIZER,
} from '@angular-ru/ngxs/internals';
import {ensureProviders, registerStorageProviders} from '@angular-ru/ngxs/storage';
import {NGXS_DATA_EXCEPTIONS} from '@angular-ru/ngxs/tokens';
import {
    DataStateClass,
    NgxsRepositoryMeta,
    PersistenceProvider,
    ProviderOptions,
} from '@angular-ru/ngxs/typings';

export function Persistence(options?: ProviderOptions): any {
    return (stateClass: DataStateClass): void => {
        const stateMeta: any = ensureStateMetadata(stateClass);
        const repositoryMeta: NgxsRepositoryMeta = getRepository(stateClass);
        const isUndecoratedClass: boolean =
            isNil(stateMeta.name) || isNil(repositoryMeta);

        if (isUndecoratedClass) {
            throw new Error(NGXS_DATA_EXCEPTIONS.NGXS_PERSISTENCE_STATE);
        }

        STORAGE_INITIALIZER.onInit((): void => {
            const providers: PersistenceProvider[] = ensureProviders(
                repositoryMeta,
                stateClass,
                options,
            );

            registerStorageProviders(providers);
        });
    };
}
