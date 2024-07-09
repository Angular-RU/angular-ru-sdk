import {NgModule} from '@angular/core';

import {IsFilledPipe} from './is-filled.pipe';

@NgModule({
    declarations: [IsFilledPipe],
    providers: [IsFilledPipe],
    exports: [IsFilledPipe],
})
export class IsFilledPipeModule {}
