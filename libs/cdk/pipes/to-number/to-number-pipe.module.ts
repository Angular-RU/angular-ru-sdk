import {NgModule} from '@angular/core';

import {ToNumberPipe} from './to-number.pipe';

@NgModule({
    declarations: [ToNumberPipe],
    providers: [ToNumberPipe],
    exports: [ToNumberPipe],
})
export class ToNumberPipeModule {}
