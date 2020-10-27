import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { MaxLengthDirective } from './max-length.directive';

@NgModule({
    declarations: [MaxLengthDirective],
    imports: [CommonModule],
    exports: [MaxLengthDirective]
})
export class MaxLengthModule {}
