import {CommonModule} from '@angular/common';
import {ModuleWithProviders, NgModule} from '@angular/core';

import {TooltipOptions} from './interfaces/tooltip-options';
import {TooltipDefaultTextInterceptor} from './services/tooltip-default-text.interceptor';
import {TooltipDomLeakService} from './services/tooltip-dom-leak.service';
import {TooltipDirective} from './tooltip.directive';
import {TOOLTIP_DEFAULT_OPTIONS} from './tooltip.properties';
import {TOOLTIP_OPTIONS_TOKEN, TOOLTIP_TEXT_INTERCEPTOR_TOKEN} from './tooltip.tokens';

@NgModule({
    imports: [CommonModule],
    exports: [TooltipDirective],
    declarations: [TooltipDirective],
    providers: [TooltipDomLeakService],
})
export class TooltipModule {
    public static forRoot(
        options: Partial<TooltipOptions> = {},
    ): ModuleWithProviders<TooltipModule> {
        return {
            ngModule: TooltipModule,
            providers: [
                {
                    provide: TOOLTIP_OPTIONS_TOKEN,
                    useValue: {...TOOLTIP_DEFAULT_OPTIONS, ...options},
                },
                {
                    provide: TOOLTIP_TEXT_INTERCEPTOR_TOKEN,
                    useClass: TooltipDefaultTextInterceptor,
                },
            ],
        };
    }
}
