import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AmountFormatDirective } from './amount-format.directive';

@NgModule({
    declarations: [AmountFormatDirective],
    imports: [CommonModule],
    exports: [AmountFormatDirective]
})
export class AmountFormatModule {}
