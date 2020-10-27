import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { TooltipDirective } from './tooltip.directive';

@NgModule({
    imports: [CommonModule],
    exports: [TooltipDirective],
    declarations: [TooltipDirective]
})
export class TooltipModule {}
