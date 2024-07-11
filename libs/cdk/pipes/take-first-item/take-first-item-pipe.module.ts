import {NgModule} from '@angular/core';

import {TakeFirstItemPipe} from './take-first-item.pipe';

@NgModule({
    declarations: [TakeFirstItemPipe],
    providers: [TakeFirstItemPipe],
    exports: [TakeFirstItemPipe],
})
export class TakeFirstItemPipeModule {}
