import {NgModule} from '@angular/core';

import {DateToNativePipe} from './date-to-native.pipe';

@NgModule({
    exports: [DateToNativePipe],
    providers: [DateToNativePipe],
    declarations: [DateToNativePipe],
})
export class DateToNativePipeModule {}
