import {NgModule} from '@angular/core';

import {DisplayItemPipe} from './display-item.pipe';

@NgModule({
    declarations: [DisplayItemPipe],
    providers: [DisplayItemPipe],
    exports: [DisplayItemPipe],
})
export class DisplayItemPipeModule {}
