import {NgModule} from '@angular/core';

import {DateToNativePipe} from './date-to-native.pipe';

@NgModule({
    declarations: [DateToNativePipe],
    providers: [DateToNativePipe],
    exports: [DateToNativePipe],
})
export class DateToNativePipeModule {}
