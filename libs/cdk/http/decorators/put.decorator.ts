import {DataHttpClient} from '@angular-ru/cdk/http';
import {EmitOptions, RequestType} from '@angular-ru/cdk/http/typings';
import {Descriptor} from '@angular-ru/cdk/typings';

import {ensureDescriptorByType} from './internal/ensure-descriptor-by-type';

export function Put<T>(
    path: string = '/',
    emitOptions: EmitOptions = {emitFailure: true, emitSuccess: true},
): MethodDecorator {
    return (
        target: any & DataHttpClient,
        _name: string | symbol,
        descriptor: Descriptor,
    ): Descriptor =>
        ensureDescriptorByType<T>({
            path,
            type: RequestType.PUT,
            target,
            descriptor,
            emitOptions,
        });
}
