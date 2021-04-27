import { NgModule } from '@angular/core';

import { HasAtMostOneItemPipe } from './has-at-most-one-item.pipe';

@NgModule({
    declarations: [HasAtMostOneItemPipe],
    exports: [HasAtMostOneItemPipe]
})
export class HasAtMostOneItemPipeModule {}
