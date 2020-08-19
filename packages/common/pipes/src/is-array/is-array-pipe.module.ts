import { NgModule } from '@angular/core';

import { IsArrayPipe } from './is-array.pipe';

@NgModule({
    declarations: [IsArrayPipe],
    exports: [IsArrayPipe],
    providers: [IsArrayPipe]
})
export class IsArrayPipeModule {}
