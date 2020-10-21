import { InvalidArgsNamesException } from '../exceptions/invalid-args-names.exception';

export class MethodArgsRegistry {
    private decoratorMap: Map<number | string, string> = new Map();
    private argumentMap: Map<number | string, string> = new Map();

    public getVariableDecoratorTypeByIndex(index: number): string | null {
        return this.decoratorMap.get(index) ?? null;
    }

    public getArgumentNameByIndex(index: number): string | null {
        return this.argumentMap.get(index) ?? null;
    }

    public createVariableDecoratorType(name: string, method: string, paramIndex: number): void {
        this.checkDuplicateName(name, method);
        this.decoratorMap.set(paramIndex, name);
        this.decoratorMap.set(name, name);
    }

    public createArgumentName(name: string, method: string, paramIndex: number): void | never {
        this.checkDuplicateName(name, method);
        this.argumentMap.set(paramIndex, name);
        this.argumentMap.set(name, name);
    }

    private checkDuplicateName(name: string, method: string): void | never {
        if (this.argumentMap.has(name) || this.decoratorMap.has(name)) {
            throw new InvalidArgsNamesException(name, method);
        }
    }
}
