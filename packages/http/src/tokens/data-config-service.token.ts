import { InjectionToken } from '@angular/core';
import { DataClientRequestOptions } from '@angular-ru/http/typings';

export const DATA_CONFIG_SERVICE_TOKEN: InjectionToken<DataClientRequestOptions> = new InjectionToken(
    'DATA_CONFIG_SERVICE_TOKEN'
);
