import { Any, Descriptor } from '@angular-ru/common/typings';
import { DataHttpClient, RestTemplate } from '@angular-ru/http';
import { EnsureDecoratorOptions } from '@angular-ru/http/typings';
import { Observable } from 'rxjs';

import { mutatePathByPathVariables } from './mutate-path-by-path-variables';
import { validateMethod } from './validate-method';
import { MethodArgsRegistry } from '@angular-ru/common/runtime';
import { ensureMethodArgsRegistry } from './ensure-method-args-registry';
import { KEY_REQUEST_BODY, META_REQUEST_BODY } from './meta-keys.config';
import { isNil } from '@angular-ru/common/utils';

// eslint-disable-next-line max-lines-per-function
export function ensureDescriptorByType<T>({ path, type, target, descriptor }: EnsureDecoratorOptions): Descriptor {
    validateMethod(target, descriptor);
    const originalMethod: Any = descriptor.value;

    descriptor.value = function (...args: Any[]): Observable<T> {
        // eslint-disable-next-line @typescript-eslint/tslint/config
        const httpClient: DataHttpClient = (this as Any) as DataHttpClient;
        const result: Observable<T> | Any = originalMethod.apply(httpClient, args);
        let restTemplate: RestTemplate<T> | null = result?.restTemplateRef ?? null;

        if (restTemplate) {
            path = mutatePathByPathVariables(path, originalMethod, args);

            const bodyRegistry: MethodArgsRegistry = ensureMethodArgsRegistry(originalMethod, META_REQUEST_BODY);
            const indexBody: number | null = bodyRegistry.getIndexByKey(KEY_REQUEST_BODY);
            const body: Any = isNil(indexBody) ? restTemplate.options.body : args?.[indexBody];
            restTemplate = restTemplate.setPath(path).setMethodType(type).setBody(body).setClient(httpClient);
        } else {
            throw new Error('You must return observable from your method');
        }

        return restTemplate?.['asObservable']?.();
    };

    return descriptor;
}
