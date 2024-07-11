import {NgModule} from '@angular/core';

import {FormatDatePipe} from './format-date.pipe';

@NgModule({
    declarations: [FormatDatePipe],
    providers: [FormatDatePipe],
    exports: [FormatDatePipe],
})
export class FormatDatePipeModule {}
