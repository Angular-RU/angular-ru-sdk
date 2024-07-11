import {NgModule} from '@angular/core';

import {ObjectSizePipe} from './object-size.pipe';

@NgModule({
    declarations: [ObjectSizePipe],
    providers: [ObjectSizePipe],
    exports: [ObjectSizePipe],
})
export class ObjectSizePipeModule {}
