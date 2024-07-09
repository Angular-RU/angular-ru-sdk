import {NGXS_DATA_EXCEPTIONS} from '@angular-ru/ngxs/tokens';
import {PersistenceProvider, StorageContainer} from '@angular-ru/ngxs/typings';

import {NgxsDataStoragePlugin} from '../ngxs-data-storage-plugin.service';
import {NGXS_DATA_STORAGE_CONTAINER_TOKEN} from '../tokens/storage-container-token';

export function registerStorageProviders(options: PersistenceProvider[]): void {
    try {
        const container: StorageContainer | undefined =
            NgxsDataStoragePlugin.injector?.get<StorageContainer>(
                NGXS_DATA_STORAGE_CONTAINER_TOKEN,
            );

        for (const option of options) {
            container?.providers.add(option);
        }
    } catch {
        throw new Error(NGXS_DATA_EXCEPTIONS.NGXS_PERSISTENCE_CONTAINER);
    }
}
