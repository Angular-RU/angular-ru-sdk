import {NgModule} from '@angular/core';

import {IsStringPipe} from './is-string.pipe';

@NgModule({
    exports: [IsStringPipe],
    providers: [IsStringPipe],
    declarations: [IsStringPipe],
})
export class IsStringPipeModule {}
