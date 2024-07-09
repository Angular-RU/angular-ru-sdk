import {NgModule} from '@angular/core';

import {ObjectSizePipe} from './object-size.pipe';

@NgModule({
    exports: [ObjectSizePipe],
    providers: [ObjectSizePipe],
    declarations: [ObjectSizePipe],
})
export class ObjectSizePipeModule {}
