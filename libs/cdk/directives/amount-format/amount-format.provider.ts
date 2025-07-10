import {makeEnvironmentProviders} from '@angular/core';

import {AMOUNT_FORMAT_OPTIONS, DEFAULT_AMOUNT_OPTIONS} from './amount-format.properties';
import {AmountOptions} from './amount-options';

export function provideAmountFormat(options: Partial<AmountOptions> = {}) {
    return makeEnvironmentProviders([
        {
            provide: AMOUNT_FORMAT_OPTIONS,
            useValue: {...DEFAULT_AMOUNT_OPTIONS, ...options},
        },
    ]);
}
