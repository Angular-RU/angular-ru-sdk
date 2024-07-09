import {NgModule} from '@angular/core';

import {EntrySingleSetPipe} from './entry-single-set.pipe';

@NgModule({
    exports: [EntrySingleSetPipe],
    providers: [EntrySingleSetPipe],
    declarations: [EntrySingleSetPipe],
})
export class EntrySingleSetPipeModule {}
