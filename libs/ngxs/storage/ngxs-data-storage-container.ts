import {PersistenceProvider, StorageContainer} from '@angular-ru/ngxs/typings';

export class NgxsDataStorageContainer implements StorageContainer {
    public providers = new Set<PersistenceProvider>();
    public keys = new Map<string, void>();

    public getProvidedKeys(): string[] {
        return Array.from(this.keys.keys());
    }
}
