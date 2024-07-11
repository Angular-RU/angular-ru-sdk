import {Nullable} from '@angular-ru/cdk/typings';

import {InvalidArgsNamesException} from '../exceptions/invalid-args-names.exception';

export interface MethodArgsRegistryMeta {
    key: string;
    index: number;
}

export class MethodArgsRegistry {
    private readonly argumentsIndexMap = new Map<
        number | string,
        MethodArgsRegistryMeta
    >();

    public get size(): number {
        return this.argumentsIndexMap.size;
    }

    public getNameByIndex(index: number): Nullable<string> {
        return this.argumentsIndexMap.get(index)?.key ?? null;
    }

    public getIndexByKey(key: string): Nullable<number> {
        return this.argumentsIndexMap.get(key)?.index ?? null;
    }

    public putIndexByName(name: string, method: string, paramIndex: number): void {
        const info: MethodArgsRegistryMeta = {key: name, index: paramIndex};

        this.checkDuplicateName(name, method);
        this.argumentsIndexMap.set(paramIndex, info);
        this.argumentsIndexMap.set(name, info);
    }

    private checkDuplicateName(name: string, method: string): never | void {
        if (this.argumentsIndexMap.has(name)) {
            throw new InvalidArgsNamesException(name, method);
        }
    }
}
