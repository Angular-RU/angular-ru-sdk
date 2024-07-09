import {NgModule} from '@angular/core';

import {SafePipe} from './safe.pipe';

@NgModule({
    exports: [SafePipe],
    providers: [SafePipe],
    declarations: [SafePipe],
})
export class SafePipeModule {}
