import {makeEnvironmentProviders} from '@angular/core';

import {TooltipOptions} from './interfaces/tooltip-options';
import {TooltipDefaultTextInterceptor} from './services/tooltip-default-text.interceptor';
import {TooltipDomLeakService} from './services/tooltip-dom-leak.service';
import {TOOLTIP_DEFAULT_OPTIONS} from './tooltip.properties';
import {TOOLTIP_OPTIONS_TOKEN, TOOLTIP_TEXT_INTERCEPTOR_TOKEN} from './tooltip.tokens';

export function provideTooltip(options: Partial<TooltipOptions> = {}) {
    return makeEnvironmentProviders([
        {
            provide: TOOLTIP_OPTIONS_TOKEN,
            useValue: {...TOOLTIP_DEFAULT_OPTIONS, ...options},
        },
        {
            provide: TOOLTIP_TEXT_INTERCEPTOR_TOKEN,
            useClass: TooltipDefaultTextInterceptor,
        },
        TooltipDomLeakService,
    ]);
}
