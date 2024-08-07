import {isTruthy} from '@angular-ru/cdk/utils';
import {ArgName, ArgNameMap, PayloadMap, PayloadName} from '@angular-ru/ngxs/typings';

import {InvalidArgsNamesException} from '../../exceptions/invalid-args-names.exception';

export class MethodArgsRegistry {
    private readonly payloadMap: PayloadMap = new Map();
    private readonly argumentMap: ArgNameMap = new Map();

    public getPayloadTypeByIndex(index: number): PayloadName | null {
        return this.payloadMap.get(index) ?? null;
    }

    public getArgumentNameByIndex(index: number): ArgName | null {
        return this.argumentMap.get(index) ?? null;
    }

    public createPayloadType(
        name: PayloadName,
        method: string,
        paramIndex: number,
    ): void {
        this.checkDuplicateName(name, method);
        this.payloadMap.set(paramIndex, name);
        this.payloadMap.set(name, name);
    }

    public createArgumentName(
        name: ArgName,
        method: string,
        paramIndex: number,
    ): never | void {
        this.checkDuplicateName(name, method);
        this.argumentMap.set(paramIndex, name);
        this.argumentMap.set(name, name);
    }

    private checkDuplicateName(name: ArgName, method: string): never | void {
        if (isTruthy(this.argumentMap.has(name)) || isTruthy(this.payloadMap.has(name))) {
            throw new InvalidArgsNamesException(name, method);
        }
    }
}
