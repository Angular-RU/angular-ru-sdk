import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { AmountFormatDirective } from './amount-format.directive';

@NgModule({
    imports: [CommonModule],
    exports: [AmountFormatDirective],
    declarations: [AmountFormatDirective]
})
export class AmountFormatDirectiveModule {}
