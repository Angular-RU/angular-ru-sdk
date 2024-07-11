import {NgModule} from '@angular/core';

import {IsStringPipe} from './is-string.pipe';

@NgModule({
    declarations: [IsStringPipe],
    providers: [IsStringPipe],
    exports: [IsStringPipe],
})
export class IsStringPipeModule {}
