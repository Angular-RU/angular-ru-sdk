import { DataClientRequestOptions } from '@angular-ru/http/typings';
import { InjectionToken } from '@angular/core';

export const DATA_CONFIG_SERVICE_TOKEN: InjectionToken<DataClientRequestOptions> = new InjectionToken(
    'DATA_CONFIG_SERVICE_TOKEN'
);
