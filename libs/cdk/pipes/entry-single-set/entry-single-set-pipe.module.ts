import {NgModule} from '@angular/core';

import {EntrySingleSetPipe} from './entry-single-set.pipe';

@NgModule({
    declarations: [EntrySingleSetPipe],
    providers: [EntrySingleSetPipe],
    exports: [EntrySingleSetPipe],
})
export class EntrySingleSetPipeModule {}
