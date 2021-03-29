import { Provider } from '@angular/core';

import { NgxTooltipTextInterceptor } from './ngx-tooltip-text.interceptor';
import { TooltipOptions } from './tooltip.interfaces';
import { TOOLTIP_TEXT_INTERCEPTOR_TOKEN } from './tooltip.tokens';

export const TOOLTIP_DEFAULT_OPTIONS: TooltipOptions = {
    cssStyle: '',
    durationBeforeCreate: 200,
    durationAfterDestroy: 1500,
    timeoutForWaitAfterBlurTooltip: 400
};

export const NGX_TOOLTIP_FALLBACK_PROVIDER: Provider = {
    provide: TOOLTIP_TEXT_INTERCEPTOR_TOKEN,
    useClass: NgxTooltipTextInterceptor
};
