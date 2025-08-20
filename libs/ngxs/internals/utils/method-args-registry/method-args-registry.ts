import {isTruthy} from '@angular-ru/cdk/utils';
import {ArgNameMap, PayloadMap} from '@angular-ru/ngxs/typings';

import {InvalidArgsNamesException} from '../../exceptions/invalid-args-names.exception';

export class MethodArgsRegistry {
    private readonly payloadMap: PayloadMap = new Map();
    private readonly argumentMap: ArgNameMap = new Map();

    public getPayloadTypeByIndex(index: number): string | null {
        return this.payloadMap.get(index) ?? null;
    }

    public getArgumentNameByIndex(index: number): string | null {
        return this.argumentMap.get(index) ?? null;
    }

    public createPayloadType(name: string, method: string, paramIndex: number): void {
        this.checkDuplicateName(name, method);
        this.payloadMap.set(paramIndex, name);
        this.payloadMap.set(name, name);
    }

    public createArgumentName(
        name: string,
        method: string,
        paramIndex: number,
    ): never | void {
        this.checkDuplicateName(name, method);
        this.argumentMap.set(paramIndex, name);
        this.argumentMap.set(name, name);
    }

    private checkDuplicateName(name: string, method: string): never | void {
        if (isTruthy(this.argumentMap.has(name)) || isTruthy(this.payloadMap.has(name))) {
            throw new InvalidArgsNamesException(name, method);
        }
    }
}
