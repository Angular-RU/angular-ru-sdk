import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { TrimInputDirective } from './trim-input.directive';

@NgModule({
    declarations: [TrimInputDirective],
    imports: [CommonModule],
    exports: [TrimInputDirective]
})
export class TrimInputModule {}
