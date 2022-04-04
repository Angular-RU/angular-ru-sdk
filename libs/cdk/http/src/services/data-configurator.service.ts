import { Inject, Injectable } from '@angular/core';
import { DataClientRequestOptions } from '@angular-ru/cdk/http/typings';

import { DATA_CONFIG_SERVICE_TOKEN } from '../tokens/data-config-service.token';

@Injectable()
export class DataConfiguratorService {
    public config: DataClientRequestOptions;

    constructor(@Inject(DATA_CONFIG_SERVICE_TOKEN) config: unknown | any) {
        this.config = config;
    }

    public mergeGlobalOptionsWith(
        local: Partial<DataClientRequestOptions>,
        options: Partial<DataClientRequestOptions>
    ): any {
        return { ...this.config, ...local, ...options };
    }
}
