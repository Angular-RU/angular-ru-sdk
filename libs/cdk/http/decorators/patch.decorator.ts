import {DataHttpClient} from '@angular-ru/cdk/http';
import {EmitOptions, RequestType} from '@angular-ru/cdk/http/typings';
import {Descriptor} from '@angular-ru/cdk/typings';

import {ensureDescriptorByType} from './internal/ensure-descriptor-by-type';

export function Patch<T>(
    path = '/',
    emitOptions: EmitOptions = {emitFailure: true, emitSuccess: true},
): MethodDecorator {
    return (
        target: DataHttpClient & any,
        _name: string | symbol,
        descriptor: Descriptor,
    ): Descriptor =>
        ensureDescriptorByType<T>({
            path,
            type: RequestType.PATCH,
            target,
            descriptor,
            emitOptions,
        });
}
