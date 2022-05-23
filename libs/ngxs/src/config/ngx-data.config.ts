import { InjectionToken } from '@angular/core';

export interface NgxsDataConfig {
    dataActionSubscribeRequired?: boolean;
}

export const NGXS_DATA_CONFIG_DEFAULT: NgxsDataConfig = {
    dataActionSubscribeRequired: true
};

export const NGXS_DATA_CONFIG: InjectionToken<NgxsDataConfig> = new InjectionToken<NgxsDataConfig>('NGXS_DATA_CONFIG', {
    providedIn: 'root',
    factory: (): NgxsDataConfig => NGXS_DATA_CONFIG_DEFAULT
});
