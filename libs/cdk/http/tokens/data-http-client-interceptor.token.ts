import {InjectionToken} from '@angular/core';
import {DataHttpInterceptor} from '@angular-ru/cdk/http/typings';

export const DATA_HTTP_CLIENT_INTERCEPTOR = new InjectionToken<DataHttpInterceptor>(
    'DATA_HTTP_CLIENT_INTERCEPTOR',
);
