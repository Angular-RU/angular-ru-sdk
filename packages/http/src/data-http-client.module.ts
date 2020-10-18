import { DataRequestOptions } from '@angular-ru/http/typings';
import { ModuleWithProviders, NgModule } from '@angular/core';

import { DataHttpClient } from './services/client/data-http.client';
import { DataConfiguratorService } from './services/data-configurator.service';
import { DATA_CONFIG_SERVICE_TOKEN } from './tokens/data-config-service.token';

@NgModule()
export class DataHttpClientModule {
    /**
     *
     * @param globalOptions - options by default for request
     */
    public static forRoot(globalOptions: DataRequestOptions): ModuleWithProviders<DataHttpClientModule> {
        return {
            ngModule: DataHttpClientModule,
            providers: [
                DataConfiguratorService,
                {
                    provide: DATA_CONFIG_SERVICE_TOKEN,
                    useValue: globalOptions
                },
                DataHttpClient
            ]
        };
    }
}
