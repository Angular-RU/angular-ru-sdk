import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { FilterCharactersDirective } from './filter-characters.directive';

@NgModule({
    imports: [CommonModule],
    declarations: [FilterCharactersDirective],
    exports: [FilterCharactersDirective]
})
export class FilterCharactersModule {}
