import {NgModule} from '@angular/core';

import {ToNumberPipe} from './to-number.pipe';

@NgModule({
    exports: [ToNumberPipe],
    providers: [ToNumberPipe],
    declarations: [ToNumberPipe],
})
export class ToNumberPipeModule {}
