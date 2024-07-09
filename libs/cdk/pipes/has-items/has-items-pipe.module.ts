import {NgModule} from '@angular/core';

import {HasItemsPipe} from './has-items.pipe';

@NgModule({
    declarations: [HasItemsPipe],
    providers: [HasItemsPipe],
    exports: [HasItemsPipe],
})
export class HasItemsPipeModule {}
