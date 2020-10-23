import { InvalidArgsNamesException } from '../exceptions/invalid-args-names.exception';

export class MethodArgsRegistry {
    private argumentsIndexMap: Map<number | string, string> = new Map();

    public get size(): number {
        return this.argumentsIndexMap.size;
    }

    public getNameByIndex(index: number): string | null {
        return this.argumentsIndexMap.get(index) ?? null;
    }

    public putIndexByName(name: string, method: string, paramIndex: number): void {
        this.checkDuplicateName(name, method);
        this.argumentsIndexMap.set(paramIndex, name);
        this.argumentsIndexMap.set(name, name);
    }

    private checkDuplicateName(name: string, method: string): void | never {
        if (this.argumentsIndexMap.has(name)) {
            throw new InvalidArgsNamesException(name, method);
        }
    }
}
