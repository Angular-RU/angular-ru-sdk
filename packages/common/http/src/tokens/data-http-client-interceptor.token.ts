import { InjectionToken } from '@angular/core';
import { DataHttpInterceptor } from '@angular-ru/common/http/typings';

export const DATA_HTTP_CLIENT_INTERCEPTOR: InjectionToken<DataHttpInterceptor> = new InjectionToken(
    'DATA_HTTP_CLIENT_INTERCEPTOR'
);
