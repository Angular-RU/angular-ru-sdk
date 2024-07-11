import {NgModule} from '@angular/core';

import {NumberFormatPipe} from './number-format.pipe';

@NgModule({
    declarations: [NumberFormatPipe],
    providers: [NumberFormatPipe],
    exports: [NumberFormatPipe],
})
export class NumberFormatPipeModule {}
