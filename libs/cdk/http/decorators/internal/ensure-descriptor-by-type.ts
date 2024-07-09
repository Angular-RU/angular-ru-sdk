import {DataHttpClient, RestTemplate} from '@angular-ru/cdk/http';
import {EnsureDecoratorOptions} from '@angular-ru/cdk/http/typings';
import {MethodArgsRegistry} from '@angular-ru/cdk/runtime';
import {Descriptor, Nullable, PlainObject} from '@angular-ru/cdk/typings';
import {isNil, isNotNil} from '@angular-ru/cdk/utils';
import {Observable} from 'rxjs';

import {ensureMethodArgsRegistry} from './ensure-method-args-registry';
import {ensureQueryParams} from './ensure-query-params';
import {KEY_REQUEST_BODY, META_REQUEST_BODY} from './meta-keys.config';
import {mutatePathByPathVariables} from './mutate-path-by-path-variables';
import {validateMethod} from './validate-method';

// eslint-disable-next-line max-lines-per-function
export function ensureDescriptorByType<T>({
    path,
    type,
    target,
    descriptor,
    emitOptions,
}: EnsureDecoratorOptions): Descriptor {
    validateMethod(target, descriptor);
    const originalMethod: any = descriptor.value;

    // eslint-disable-next-line max-lines-per-function
    descriptor.value = function (...args: any[]): Observable<T> {
        let newPath: string = path.toString();
        // eslint-disable-next-line @typescript-eslint/no-this-alias
        const httpClient: DataHttpClient = this as any;
        const result: Observable<T> | any = originalMethod.apply(httpClient, args);
        let template: Nullable<RestTemplate<T>> = result?.restTemplateRef ?? null;

        if (isNotNil(template)) {
            newPath = mutatePathByPathVariables({
                args,
                path: newPath,
                originalMethod,
                pathVariables: template.options.pathVariables,
            });

            const bodyRegistry: MethodArgsRegistry = ensureMethodArgsRegistry(
                originalMethod,
                META_REQUEST_BODY,
            );
            const indexBody: Nullable<number> =
                bodyRegistry.getIndexByKey(KEY_REQUEST_BODY);
            const body: any = isNil(indexBody)
                ? template?.options.body
                : template?.options.body ?? args?.[indexBody as any];
            const params: Nullable<PlainObject> = ensureQueryParams(
                template?.options.queryParams,
                originalMethod,
                args,
            );

            template = template
                ?.setPath(newPath)
                .setMethodType(type)
                .setBody(body)
                .setParams(params)
                .setEmitOptions(emitOptions)
                .setClient(httpClient);
        } else {
            throw new Error('You must return observable from your method');
        }

        return template?.asObservable?.();
    };

    return descriptor;
}
