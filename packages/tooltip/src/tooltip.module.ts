import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';

import { TooltipDirective } from './tooltip.directive';
import { TooltipOptions } from './tooltip.interfaces';
import { TOOLTIP_DEFAULT_OPTIONS } from './tooltip.properties';
import { TOOLTIP_OPTIONS_TOKEN, TOOLTIP_TEXT_INTERCEPTOR_TOKEN } from './tooltip.tokens';
import { TooltipDefaultTextInterceptor } from './tooltip-default-text.interceptor';
import { TooltipDomLeakService } from './tooltip-dom-leak.service';

@NgModule({
    imports: [CommonModule],
    exports: [TooltipDirective],
    declarations: [TooltipDirective],
    providers: [TooltipDomLeakService]
})
export class TooltipModule {
    public static forRoot(options: Partial<TooltipOptions> = {}): ModuleWithProviders<TooltipModule> {
        return {
            ngModule: TooltipModule,
            providers: [
                { provide: TOOLTIP_OPTIONS_TOKEN, useValue: { ...TOOLTIP_DEFAULT_OPTIONS, ...options } },
                { provide: TOOLTIP_TEXT_INTERCEPTOR_TOKEN, useClass: TooltipDefaultTextInterceptor }
            ]
        };
    }
}
