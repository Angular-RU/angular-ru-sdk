import { Any } from '@angular-ru/common/typings';
import { DataRequestOptions } from '@angular-ru/http/typings';
import { Inject, Injectable } from '@angular/core';

import { DATA_CONFIG_SERVICE_TOKEN } from '../tokens/data-config-service.token';

@Injectable()
export class DataConfiguratorService {
    public config: DataRequestOptions;

    constructor(@Inject(DATA_CONFIG_SERVICE_TOKEN) config: Any) {
        this.config = config;
    }

    public mergeGlobalOptionsWith(options: Partial<DataRequestOptions>): Any {
        return { ...this.config, ...options };
    }
}
