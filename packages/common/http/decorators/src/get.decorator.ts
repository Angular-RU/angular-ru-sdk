import { DataHttpClient } from '@angular-ru/common/http';
import { EmitOptions, RequestType } from '@angular-ru/common/http/typings';
import { Any, Descriptor } from '@angular-ru/common/typings';

import { ensureDescriptorByType } from './internal/ensure-descriptor-by-type';

export function Get<T>(
    path: string = '/',
    emitOptions: EmitOptions = { emitFailure: true, emitSuccess: false }
): MethodDecorator {
    return (target: Any & DataHttpClient, _name: string | symbol, descriptor: Descriptor): Descriptor =>
        ensureDescriptorByType<T>({ path, type: RequestType.GET, target, descriptor, emitOptions });
}
