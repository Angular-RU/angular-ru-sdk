import { ensureMethodArgsRegistry, MethodArgsRegistry } from '@angular-ru/ngxs/internals';
import { NGXS_DATA_EXCEPTIONS } from '@angular-ru/ngxs/tokens';
import { DataStateClass, StateArgumentDecorator } from '@angular-ru/ngxs/typings';

export function Payload(name: string): StateArgumentDecorator {
    return (stateClass: DataStateClass, methodName: string | symbol, parameterIndex: number): void => {
        const key: string = name.trim();

        if (!key) {
            throw new Error(NGXS_DATA_EXCEPTIONS.NGXS_INVALID_PAYLOAD_NAME);
        }

        const registry: MethodArgsRegistry = ensureMethodArgsRegistry(stateClass, methodName);

        registry.createPayloadType(key, methodName as string, parameterIndex);
    };
}
