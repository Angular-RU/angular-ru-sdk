import {EnvironmentProviders, makeEnvironmentProviders} from '@angular/core';
import {withNgxsPlugin} from '@ngxs/store';

import {NgxsDataStoragePlugin} from './ngxs-data-storage-plugin.service';
import {NGXS_DATA_STORAGE_CONTAINER} from './tokens/storage-container-provider';
import {NGXS_DATA_STORAGE_DECODE_TYPE} from './tokens/storage-decode-type';
import {NGXS_DATA_STORAGE_PREFIX} from './tokens/storage-prefix';

export function withNgxsDataStorage(): EnvironmentProviders {
    return makeEnvironmentProviders([
        withNgxsPlugin(NgxsDataStoragePlugin),
        NGXS_DATA_STORAGE_CONTAINER,
        NGXS_DATA_STORAGE_PREFIX,
        NGXS_DATA_STORAGE_DECODE_TYPE,
    ]);
}
