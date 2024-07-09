import {PersistenceProvider, StorageContainer} from '@angular-ru/ngxs/typings';

export class NgxsDataStorageContainer implements StorageContainer {
    public providers: Set<PersistenceProvider> = new Set();
    public keys: Map<string, void> = new Map();

    public getProvidedKeys(): string[] {
        return Array.from(this.keys.keys());
    }
}
