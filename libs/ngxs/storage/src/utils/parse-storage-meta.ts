import { StorageMeta } from '@angular-ru/ngxs/typings';

import { InvalidStructureDataException } from '../exceptions/invalid-structure-data.exception';

export function parseStorageMeta<T>(value: string | null): StorageMeta<T> | never {
    try {
        return JSON.parse(value!);
    } catch (e: unknown) {
        throw new InvalidStructureDataException((e as Error).message);
    }
}
