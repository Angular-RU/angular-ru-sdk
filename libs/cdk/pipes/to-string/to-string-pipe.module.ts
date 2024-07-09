import {NgModule} from '@angular/core';

import {ToStringPipe} from './to-string.pipe';

@NgModule({
    exports: [ToStringPipe],
    providers: [ToStringPipe],
    declarations: [ToStringPipe],
})
export class ToStringPipeModule {}
