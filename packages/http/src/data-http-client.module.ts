import { DataRequestOptions } from '@angular-ru/http/typings';
import { ModuleWithProviders, NgModule } from '@angular/core';

import { DATA_CONFIG_SERVICE_TOKEN } from './configs/data-config-service.token';
import { DATA_REQUEST_OPTIONS_CONFIG } from './configs/data-request-options.config';
import { DataHttpClient } from './services/client/data-http.client';
import { DataConfiguratorService } from './services/data-configurator.service';
import { DataInterceptorService } from './services/data-interceptor.service';

@NgModule()
export class DataHttpClientModule {
    public static forRoot(globalOptions: Partial<DataRequestOptions> = {}): ModuleWithProviders<DataHttpClientModule> {
        return {
            ngModule: DataHttpClientModule,
            providers: [
                DataConfiguratorService,
                {
                    provide: DATA_CONFIG_SERVICE_TOKEN,
                    useValue: { ...DATA_REQUEST_OPTIONS_CONFIG, ...globalOptions }
                },
                DataHttpClient,
                DataInterceptorService
            ]
        };
    }
}
