import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { FilterDirective } from './filter.directive';

@NgModule({
    imports: [CommonModule],
    declarations: [FilterDirective],
    exports: [FilterDirective]
})
export class FilterModule {}
