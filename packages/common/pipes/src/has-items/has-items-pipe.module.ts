import { NgModule } from '@angular/core';

import { HasItemsPipe } from './has-items.pipe';

@NgModule({
    declarations: [HasItemsPipe],
    exports: [HasItemsPipe]
})
export class HasItemsPipeModule {}
