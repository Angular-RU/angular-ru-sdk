import {InjectionToken} from '@angular/core';
import {STORAGE_DECODE_TYPE} from '@angular-ru/ngxs/typings';

export const NGXS_DATA_STORAGE_DECODE_TYPE_TOKEN: InjectionToken<STORAGE_DECODE_TYPE> =
    new InjectionToken('NGXS_DATA_STORAGE_DECODE_TYPE_TOKEN');
