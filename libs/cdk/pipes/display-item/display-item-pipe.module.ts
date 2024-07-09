import {NgModule} from '@angular/core';

import {DisplayItemPipe} from './display-item.pipe';

@NgModule({
    exports: [DisplayItemPipe],
    providers: [DisplayItemPipe],
    declarations: [DisplayItemPipe],
})
export class DisplayItemPipeModule {}
