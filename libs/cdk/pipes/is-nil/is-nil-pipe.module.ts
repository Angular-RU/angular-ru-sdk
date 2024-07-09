import {NgModule} from '@angular/core';

import {IsNilPipe} from './is-nil.pipe';

@NgModule({
    exports: [IsNilPipe],
    providers: [IsNilPipe],
    declarations: [IsNilPipe],
})
export class IsNilPipeModule {}
