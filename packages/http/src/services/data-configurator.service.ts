import { Any } from '@angular-ru/common/typings';
import { DataClientRequestOptions } from '@angular-ru/http/typings';
import { Inject, Injectable } from '@angular/core';

import { DATA_CONFIG_SERVICE_TOKEN } from '../tokens/data-config-service.token';

@Injectable()
export class DataConfiguratorService {
    public config: DataClientRequestOptions;

    constructor(@Inject(DATA_CONFIG_SERVICE_TOKEN) config: Any) {
        this.config = config;
    }

    public mergeGlobalOptionsWith(
        local: Partial<DataClientRequestOptions>,
        options: Partial<DataClientRequestOptions>
    ): Any {
        return { ...this.config, ...local, ...options };
    }
}
