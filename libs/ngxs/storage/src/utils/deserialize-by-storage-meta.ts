import { isSimpleObject } from '@angular-ru/cdk/object';
import { checkValueIsEmpty } from '@angular-ru/cdk/utils';
import { PersistenceProvider, STORAGE_DECODE_TYPE, StorageData, StorageMeta } from '@angular-ru/ngxs/typings';

import { InvalidDataValueException } from '../exceptions/invalid-data-value.exception';
import { InvalidLastChangedException } from '../exceptions/invalid-last-changed.exception';
import { InvalidStructureDataException } from '../exceptions/invalid-structure-data.exception';
import { InvalidVersionException } from '../exceptions/invalid-version.exception';

export function deserializeByStorageMeta<T>(
    meta: StorageMeta<T>,
    value: string | null,
    provider: PersistenceProvider
): StorageData<T> | never {
    if (isSimpleObject(meta)) {
        if (missingLastChanged(meta)) {
            throw new InvalidLastChangedException(value);
        } else if (versionIsInvalid(meta)) {
            throw new InvalidVersionException(meta.version);
        } else if (missingDataKey(meta)) {
            throw new InvalidDataValueException();
        }

        return provider.decode === STORAGE_DECODE_TYPE.BASE64
            ? JSON.parse(window.atob(meta.data as string))
            : meta.data;
    } else {
        throw new InvalidStructureDataException(`"${value}" not an object`);
    }
}

function versionIsInvalid<T>(meta: StorageMeta<T>): boolean {
    const version: number = parseFloat(meta.version?.toString() ?? '');

    return isNaN(version) || version < 1 || parseInt(meta.version?.toString()) !== version;
}

function missingDataKey<T>(meta: StorageMeta<T>): boolean {
    return !('data' in meta);
}

function missingLastChanged<T>(meta: StorageMeta<T>): boolean {
    return !('lastChanged' in meta) || checkValueIsEmpty(meta.lastChanged);
}
