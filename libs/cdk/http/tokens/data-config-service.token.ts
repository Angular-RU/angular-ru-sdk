import {InjectionToken} from '@angular/core';
import {DataClientRequestOptions} from '@angular-ru/cdk/http/typings';

export const DATA_CONFIG_SERVICE_TOKEN = new InjectionToken<DataClientRequestOptions>(
    'DATA_CONFIG_SERVICE_TOKEN',
);
