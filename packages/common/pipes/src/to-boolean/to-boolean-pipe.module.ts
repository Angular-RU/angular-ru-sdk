import { NgModule } from '@angular/core';

import { ToBooleanPipe } from './to-boolean.pipe';

@NgModule({
    exports: [ToBooleanPipe],
    providers: [ToBooleanPipe],
    declarations: [ToBooleanPipe]
})
export class ToBooleanPipeModule {}
