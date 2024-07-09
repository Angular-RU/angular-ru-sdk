import {Provider} from '@angular/core';
import {STORAGE_DECODE_TYPE} from '@angular-ru/ngxs/typings';

import {NGXS_DATA_STORAGE_DECODE_TYPE_TOKEN} from './storage-decode-type-token';

export const NGXS_DATA_STORAGE_DECODE_TYPE: Provider = {
    provide: NGXS_DATA_STORAGE_DECODE_TYPE_TOKEN,
    useValue: STORAGE_DECODE_TYPE.NONE,
};
