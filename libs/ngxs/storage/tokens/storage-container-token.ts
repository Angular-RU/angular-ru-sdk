import {InjectionToken} from '@angular/core';
import {StorageContainer} from '@angular-ru/ngxs/typings';

export const NGXS_DATA_STORAGE_CONTAINER_TOKEN: InjectionToken<StorageContainer> =
    new InjectionToken('NGXS_DATA_STORAGE_CONTAINER_TOKEN');
