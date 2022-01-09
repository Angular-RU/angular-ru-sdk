import { DataHttpClient } from '@angular-ru/cdk/http';
import { EmitOptions, RequestType } from '@angular-ru/cdk/http/typings';
import { Any, Descriptor } from '@angular-ru/cdk/typings';

import { ensureDescriptorByType } from './internal/ensure-descriptor-by-type';

export function Post<T>(
    path: string = '/',
    emitOptions: EmitOptions = { emitFailure: true, emitSuccess: true }
): MethodDecorator {
    return (target: Any & DataHttpClient, _name: string | symbol, descriptor: Descriptor): Descriptor =>
        ensureDescriptorByType<T>({ path, type: RequestType.POST, target, descriptor, emitOptions });
}
