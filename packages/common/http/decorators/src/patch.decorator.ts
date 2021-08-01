import { DataHttpClient } from '@angular-ru/common/http';
import { EmitOptions, RequestType } from '@angular-ru/common/http/typings';
import { Any, Descriptor } from '@angular-ru/common/typings';

import { ensureDescriptorByType } from './internal/ensure-descriptor-by-type';

export function Patch<T>(
    path: string = '/',
    emitOptions: EmitOptions = { emitFailure: true, emitSuccess: true }
): MethodDecorator {
    return (target: Any & DataHttpClient, _name: string | symbol, descriptor: Descriptor): Descriptor =>
        ensureDescriptorByType<T>({ path, type: RequestType.PATCH, target, descriptor, emitOptions });
}
