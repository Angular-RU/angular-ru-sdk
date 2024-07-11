import {NgModule} from '@angular/core';

import {TakeSecondItemPipe} from './take-second-item.pipe';

@NgModule({
    declarations: [TakeSecondItemPipe],
    providers: [TakeSecondItemPipe],
    exports: [TakeSecondItemPipe],
})
export class TakeSecondItemPipeModule {}
