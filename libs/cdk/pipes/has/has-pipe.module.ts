import {NgModule} from '@angular/core';

import {HasPipe} from './has.pipe';

@NgModule({
    declarations: [HasPipe],
    providers: [HasPipe],
    exports: [HasPipe],
})
export class HasPipeModule {}
