import {NgModule} from '@angular/core';

import {MutableTypePipe} from './mutable-type.pipe';

@NgModule({
    declarations: [MutableTypePipe],
    providers: [MutableTypePipe],
    exports: [MutableTypePipe],
})
export class MutableTypePipeModule {}
