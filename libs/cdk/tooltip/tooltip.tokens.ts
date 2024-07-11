import {InjectionToken} from '@angular/core';

import {TooltipOptions} from './interfaces/tooltip-options';
import {TooltipTextInterceptor} from './interfaces/tooltip-text-interceptor';

export const TOOLTIP_TEXT_INTERCEPTOR_TOKEN = new InjectionToken<TooltipTextInterceptor>(
    'TOOLTIP_TEXT_INTERCEPTOR_TOKEN',
);

export const TOOLTIP_OPTIONS_TOKEN: InjectionToken<TooltipOptions> =
    new InjectionToken<TooltipOptions>('TOOLTIP_OPTIONS_TOKEN');
