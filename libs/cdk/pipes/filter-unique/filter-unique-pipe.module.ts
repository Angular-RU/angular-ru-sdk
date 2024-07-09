import {NgModule} from '@angular/core';

import {FilterUniquePipe} from './filter-unique.pipe';

@NgModule({
    exports: [FilterUniquePipe],
    providers: [FilterUniquePipe],
    declarations: [FilterUniquePipe],
})
export class FilterUniquePipeModule {}
