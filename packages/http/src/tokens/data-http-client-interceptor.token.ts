import { DataHttpInterceptor } from '@angular-ru/http/typings';
import { InjectionToken } from '@angular/core';

export const DATA_HTTP_CLIENT_INTERCEPTOR: InjectionToken<DataHttpInterceptor> = new InjectionToken(
    'DATA_HTTP_CLIENT_INTERCEPTOR'
);
