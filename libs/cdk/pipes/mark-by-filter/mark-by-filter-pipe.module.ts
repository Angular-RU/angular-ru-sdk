import {NgModule} from '@angular/core';

import {MarkByFilterPipe} from './mark-by-filter.pipe';

@NgModule({
    exports: [MarkByFilterPipe],
    providers: [MarkByFilterPipe],
    declarations: [MarkByFilterPipe],
})
export class MarkByFilterPipeModule {}
