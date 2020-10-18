import { DataRequestOptions } from '@angular-ru/http/typings';
import { InjectionToken } from '@angular/core';

export const DATA_CONFIG_SERVICE_TOKEN: InjectionToken<DataRequestOptions> = new InjectionToken(
    'DataConfigServiceImpl'
);
