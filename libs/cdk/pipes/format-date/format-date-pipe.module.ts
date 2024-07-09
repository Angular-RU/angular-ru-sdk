import {NgModule} from '@angular/core';

import {FormatDatePipe} from './format-date.pipe';

@NgModule({
    exports: [FormatDatePipe],
    providers: [FormatDatePipe],
    declarations: [FormatDatePipe],
})
export class FormatDatePipeModule {}
