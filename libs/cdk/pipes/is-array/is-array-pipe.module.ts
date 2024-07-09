import {NgModule} from '@angular/core';

import {IsArrayPipe} from './is-array.pipe';

@NgModule({
    exports: [IsArrayPipe],
    providers: [IsArrayPipe],
    declarations: [IsArrayPipe],
})
export class IsArrayPipeModule {}
