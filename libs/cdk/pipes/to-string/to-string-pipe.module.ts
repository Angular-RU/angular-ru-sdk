import {NgModule} from '@angular/core';

import {ToStringPipe} from './to-string.pipe';

@NgModule({
    declarations: [ToStringPipe],
    providers: [ToStringPipe],
    exports: [ToStringPipe],
})
export class ToStringPipeModule {}
