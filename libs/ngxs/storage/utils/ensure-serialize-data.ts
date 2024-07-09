import {isNotNil} from '@angular-ru/cdk/utils';
import {
    PersistenceProvider,
    STORAGE_DECODE_TYPE,
    StorageData,
} from '@angular-ru/ngxs/typings';

export function ensureSerializeData<T>(
    data: T | null,
    provider: PersistenceProvider,
): StorageData<T> {
    const dataLocal: T | null = isNotNil(data) ? data : null;

    return provider.decode === STORAGE_DECODE_TYPE.BASE64
        ? window.btoa(JSON.stringify(dataLocal))
        : dataLocal;
}
