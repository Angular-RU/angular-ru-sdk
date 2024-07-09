import {NgModule} from '@angular/core';

import {HasManyItemsPipe} from './has-many-items.pipe';

@NgModule({
    declarations: [HasManyItemsPipe],
    providers: [HasManyItemsPipe],
    exports: [HasManyItemsPipe],
})
export class HasManyItemsPipeModule {}
