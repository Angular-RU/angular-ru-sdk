import {NgModule} from '@angular/core';

import {HasOneItemPipe} from './has-one-item.pipe';

@NgModule({
    declarations: [HasOneItemPipe],
    providers: [HasOneItemPipe],
    exports: [HasOneItemPipe],
})
export class HasOneItemPipeModule {}
