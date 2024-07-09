import {PersistenceProvider} from '@angular-ru/ngxs/typings';

export function existTtl(provider: PersistenceProvider): boolean {
    return provider.ttl !== -1 && !isNaN(provider.ttl!) && provider.ttl! > 0;
}
