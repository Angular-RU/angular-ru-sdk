import { InjectionToken } from '@angular/core';

import { TooltipOptions, TooltipTextInterceptor } from './tooltip.interfaces';

export const TOOLTIP_TEXT_INTERCEPTOR_TOKEN: InjectionToken<TooltipTextInterceptor> = new InjectionToken(
    'TOOLTIP_TEXT_INTERCEPTOR_TOKEN'
);

export const TOOLTIP_OPTIONS_TOKEN: InjectionToken<TooltipOptions> = new InjectionToken<TooltipOptions>(
    'TOOLTIP_OPTIONS_TOKEN'
);
