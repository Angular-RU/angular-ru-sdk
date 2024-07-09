import {NgModule} from '@angular/core';

import {TakeFirstItemPipe} from './take-first-item.pipe';

@NgModule({
    exports: [TakeFirstItemPipe],
    providers: [TakeFirstItemPipe],
    declarations: [TakeFirstItemPipe],
})
export class TakeFirstItemPipeModule {}
