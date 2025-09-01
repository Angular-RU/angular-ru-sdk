import {inject, Injectable} from '@angular/core';
import {DataClientRequestOptions} from '@angular-ru/cdk/http/typings';

import {DATA_CONFIG_SERVICE_TOKEN} from '../tokens/data-config-service.token';

@Injectable()
export class DataConfiguratorService {
    public config = inject(DATA_CONFIG_SERVICE_TOKEN);

    public mergeGlobalOptionsWith(
        local: Partial<DataClientRequestOptions>,
        options: Partial<DataClientRequestOptions>,
    ): any {
        return {...this.config, ...local, ...options};
    }
}
