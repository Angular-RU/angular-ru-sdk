import {InjectionToken} from '@angular/core';

import {AmountOptions} from './amount-options';

export const AMOUNT_FORMAT_OPTIONS: InjectionToken<AmountOptions> =
    new InjectionToken<AmountOptions>('AMOUNT_FORMAT_OPTIONS');

export const DEFAULT_AMOUNT_OPTIONS: AmountOptions = {lang: 'ru-RU'};
