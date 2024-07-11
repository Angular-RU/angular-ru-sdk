import {NgModule} from '@angular/core';

import {FilterUniquePipe} from './filter-unique.pipe';

@NgModule({
    declarations: [FilterUniquePipe],
    providers: [FilterUniquePipe],
    exports: [FilterUniquePipe],
})
export class FilterUniquePipeModule {}
