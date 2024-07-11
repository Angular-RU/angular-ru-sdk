import {NgModule} from '@angular/core';

import {MarkByFilterPipe} from './mark-by-filter.pipe';

@NgModule({
    declarations: [MarkByFilterPipe],
    providers: [MarkByFilterPipe],
    exports: [MarkByFilterPipe],
})
export class MarkByFilterPipeModule {}
