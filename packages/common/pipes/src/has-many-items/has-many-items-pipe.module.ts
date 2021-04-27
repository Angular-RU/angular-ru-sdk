import { NgModule } from '@angular/core';

import { HasManyItemsPipe } from './has-many-items.pipe';

@NgModule({
    declarations: [HasManyItemsPipe],
    exports: [HasManyItemsPipe]
})
export class HasManyItemsPipeModule {}
