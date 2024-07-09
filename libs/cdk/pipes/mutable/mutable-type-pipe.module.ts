import {NgModule} from '@angular/core';

import {MutableTypePipe} from './mutable-type.pipe';

@NgModule({
    exports: [MutableTypePipe],
    providers: [MutableTypePipe],
    declarations: [MutableTypePipe],
})
export class MutableTypePipeModule {}
