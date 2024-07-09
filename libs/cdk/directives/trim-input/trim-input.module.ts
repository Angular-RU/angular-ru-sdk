import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';

import {TrimInputDirective} from './trim-input.directive';

@NgModule({
    imports: [CommonModule],
    declarations: [TrimInputDirective],
    exports: [TrimInputDirective],
})
export class TrimInputModule {}
