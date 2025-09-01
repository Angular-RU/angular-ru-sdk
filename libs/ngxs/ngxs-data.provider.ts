import {
    EnvironmentProviders,
    inject,
    makeEnvironmentProviders,
    provideAppInitializer,
} from '@angular/core';
import {
    NgxsDataFactory,
    NgxsDataInjector,
    NgxsDataSequence,
} from '@angular-ru/ngxs/internals';
import {ɵprovideNgxsInternalStateTokens as provideNgxsInternalStateTokens} from '@ngxs/store';

import type {NgxsDataConfig} from './config/ngx-data.config';
import {NGXS_DATA_CONFIG, NGXS_DATA_CONFIG_DEFAULT} from './config/ngx-data.config';

export function provideNgxsDataPlugin(
    ...extensions: EnvironmentProviders[]
): EnvironmentProviders;
export function provideNgxsDataPlugin(
    config: NgxsDataConfig,
    ...extensions: EnvironmentProviders[]
): EnvironmentProviders;

export function provideNgxsDataPlugin(
    ...configAndExtensions: any[]
): EnvironmentProviders {
    const extensions: EnvironmentProviders[] = [];
    let config: NgxsDataConfig = NGXS_DATA_CONFIG_DEFAULT;

    if (configAndExtensions.length > 0) {
        if (isEnvironmentProvider(configAndExtensions[0])) {
            extensions.push(...configAndExtensions);
        } else {
            config = {
                ...config,
                ...configAndExtensions[0],
            };
            extensions.push(...configAndExtensions.slice(1));
        }
    }

    return makeEnvironmentProviders([
        NgxsDataFactory,
        NgxsDataInjector,
        NgxsDataSequence,
        provideNgxsInternalStateTokens(),
        ...extensions,
        {
            provide: NGXS_DATA_CONFIG,
            useValue: config,
        },
        provideAppInitializer(() => {
            inject(NgxsDataFactory);
            inject(NgxsDataInjector);
        }),
    ]);
}

function isEnvironmentProvider(target: any): target is EnvironmentProviders {
    return !!target.ɵproviders;
}
