import {NgModule} from '@angular/core';

import {BracePipe} from './brace.pipe';

@NgModule({
    exports: [BracePipe],
    providers: [BracePipe],
    declarations: [BracePipe],
})
export class BracePipeModule {}
