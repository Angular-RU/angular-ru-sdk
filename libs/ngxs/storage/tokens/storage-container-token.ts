import {InjectionToken} from '@angular/core';
import {StorageContainer} from '@angular-ru/ngxs/typings';

export const NGXS_DATA_STORAGE_CONTAINER_TOKEN = new InjectionToken<StorageContainer>(
    'NGXS_DATA_STORAGE_CONTAINER_TOKEN',
);
