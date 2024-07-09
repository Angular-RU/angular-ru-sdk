import {NgModule} from '@angular/core';

import {TakeSecondItemPipe} from './take-second-item.pipe';

@NgModule({
    exports: [TakeSecondItemPipe],
    providers: [TakeSecondItemPipe],
    declarations: [TakeSecondItemPipe],
})
export class TakeSecondItemPipeModule {}
