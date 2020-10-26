import { Any, Descriptor } from '@angular-ru/common/typings';
import { DataHttpClient } from '@angular-ru/http';
import { EmitOptions, RequestType } from '@angular-ru/http/typings';

import { ensureDescriptorByType } from './internal/ensure-descriptor-by-type';

export function Patch<T>(
    path: string = '/',
    emitOptions: EmitOptions = { emitFailure: true, emitSuccess: true }
): MethodDecorator {
    return (target: Any & DataHttpClient, _name: string | symbol, descriptor: Descriptor): Descriptor =>
        ensureDescriptorByType<T>({ path, type: RequestType.PATCH, target, descriptor, emitOptions });
}
