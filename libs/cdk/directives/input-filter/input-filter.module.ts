import {CommonModule} from '@angular/common';
import {ModuleWithProviders, NgModule} from '@angular/core';
import {Nullable} from '@angular-ru/cdk/typings';

import {InputFilterConfig} from './input-filter.config';
import {InputFilterDirective} from './input-filter.directive';

@NgModule({
    imports: [CommonModule],
    declarations: [InputFilterDirective],
    exports: [InputFilterDirective],
})
export class InputFilterModule {
    public static forRoot(
        config: Nullable<Partial<InputFilterConfig>>,
    ): ModuleWithProviders<InputFilterModule> {
        return {
            ngModule: InputFilterModule,
            providers: [
                {
                    provide: InputFilterConfig,
                    useValue: config,
                },
            ],
        };
    }

    public static forChild(
        config: Nullable<Partial<InputFilterConfig>>,
    ): ModuleWithProviders<InputFilterModule> {
        return {
            ngModule: InputFilterModule,
            providers: [
                {
                    provide: InputFilterConfig,
                    useValue: config,
                },
            ],
        };
    }
}
