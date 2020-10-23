import { Any, Descriptor } from '@angular-ru/common/typings';
import { DataHttpClient } from '@angular-ru/http';
import { RequestType } from '@angular-ru/http/typings';

import { ensureDescriptorByType } from './internal/ensure-descriptor-by-type';

export function Put<T>(path: string = '/'): MethodDecorator {
    return (target: Any & DataHttpClient, _name: string | symbol, descriptor: Descriptor): Descriptor =>
        ensureDescriptorByType<T>({ path, type: RequestType.PUT, target, descriptor });
}
