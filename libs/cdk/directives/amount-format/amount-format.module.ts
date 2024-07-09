import {CommonModule} from '@angular/common';
import {ModuleWithProviders, NgModule} from '@angular/core';

import {AmountFormatDirective} from './amount-format.directive';
import {AMOUNT_FORMAT_OPTIONS, DEFAULT_AMOUNT_OPTIONS} from './amount-format.properties';
import {AmountOptions} from './amount-options';

@NgModule({
    imports: [CommonModule],
    declarations: [AmountFormatDirective],
    exports: [AmountFormatDirective],
})
export class AmountFormatModule {
    public static forRoot(
        options: Partial<AmountOptions> = {},
    ): ModuleWithProviders<AmountFormatModule> {
        return {
            ngModule: AmountFormatModule,
            providers: [
                {
                    provide: AMOUNT_FORMAT_OPTIONS,
                    useValue: {...DEFAULT_AMOUNT_OPTIONS, ...options},
                },
            ],
        };
    }
}
