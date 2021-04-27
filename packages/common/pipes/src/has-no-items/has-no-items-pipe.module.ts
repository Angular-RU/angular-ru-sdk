import { NgModule } from '@angular/core';

import { HasNoItemsPipe } from './has-no-items.pipe';

@NgModule({
    declarations: [HasNoItemsPipe],
    exports: [HasNoItemsPipe]
})
export class HasNoItemsPipeModule {}
