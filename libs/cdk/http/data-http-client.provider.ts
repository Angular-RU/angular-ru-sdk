import {makeEnvironmentProviders, Type} from '@angular/core';
import {DataClientRequestOptions} from '@angular-ru/cdk/http/typings';
import {PlainObject} from '@angular-ru/cdk/typings';

import {DATA_REQUEST_OPTIONS_CONFIG} from './configs/data-request-options.config';
import {DataConfiguratorService} from './services/data-configurator.service';
import {DataHttpClient} from './services/data-http.client';
import {DefaultHttpClientInterceptor} from './services/default-http-client-interceptor';
import {LimitConcurrencyService} from './services/limit-concurrency.service';
import {DATA_CONFIG_SERVICE_TOKEN} from './tokens/data-config-service.token';
import {DATA_HTTP_CLIENT_INTERCEPTOR} from './tokens/data-http-client-interceptor.token';

export function provideDataHttpClientOptions<K extends PlainObject = any>(
    clients: Array<Type<unknown>> = [],
    options: Partial<DataClientRequestOptions<K>> = {},
) {
    return makeEnvironmentProviders([
        [
            DataConfiguratorService,
            {
                provide: DATA_CONFIG_SERVICE_TOKEN,
                useValue: {...DATA_REQUEST_OPTIONS_CONFIG, ...options},
            },
            {
                provide: DATA_HTTP_CLIENT_INTERCEPTOR,
                useClass: DefaultHttpClientInterceptor,
            },
            DataHttpClient,
            LimitConcurrencyService,
            ...clients,
        ],
    ]);
}

export function provideDataHttpClientClients(clients: Array<Type<unknown>>) {
    return makeEnvironmentProviders(clients);
}
