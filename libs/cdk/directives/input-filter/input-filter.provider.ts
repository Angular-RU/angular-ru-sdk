import {makeEnvironmentProviders} from '@angular/core';
import {Nullable} from '@angular-ru/cdk/typings';

import {InputFilterConfig} from './input-filter.config';

export function provideInputFilter(config: Nullable<Partial<InputFilterConfig>>) {
    return makeEnvironmentProviders([
        {
            provide: InputFilterConfig,
            useValue: config,
        },
    ]);
}
