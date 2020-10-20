import { Any, Descriptor } from '@angular-ru/common/typings';
import { DataHttpRequestType } from '@angular-ru/http/typings';
import { Observable } from 'rxjs';

import { DataHttpClient } from '../services/data-http.client';
import { RestTemplate } from '../utils/rest-template';
import { validateMethod } from '../utils/validate-method';

export function Get<T>(path: string = '/'): MethodDecorator {
    // eslint-disable-next-line max-lines-per-function
    return (target: Any & DataHttpClient, _name: string | symbol, descriptor: Descriptor): Descriptor => {
        validateMethod(target, descriptor);
        const originalMethod: Any = descriptor.value;

        descriptor.value = function (...args: Any[]): Observable<T> {
            // eslint-disable-next-line @typescript-eslint/tslint/config
            const httpClient: DataHttpClient = (this as Any) as DataHttpClient;
            const result: Observable<T> | Any = originalMethod.apply(httpClient, args);

            let restTemplate: RestTemplate<T> | null = result?.restTemplateRef ?? null;

            if (restTemplate) {
                restTemplate = restTemplate.setPath(path).setMethodType(DataHttpRequestType.GET).setClient(httpClient);
            } else {
                throw new Error('You must return observable from your method');
            }

            return restTemplate?.['asObservable']?.();
        };

        return descriptor;
    };
}
