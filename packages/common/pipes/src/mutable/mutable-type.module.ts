import { NgModule } from '@angular/core';

import { MutableTypePipe } from './mutable-type.pipe';

@NgModule({
    declarations: [MutableTypePipe],
    exports: [MutableTypePipe]
})
export class MutableTypeModule {}
