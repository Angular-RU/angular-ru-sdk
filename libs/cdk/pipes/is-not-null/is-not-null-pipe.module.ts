import {NgModule} from '@angular/core';

import {IsNotNullPipe} from './is-not-null.pipe';

@NgModule({
    declarations: [IsNotNullPipe],
    providers: [IsNotNullPipe],
    exports: [IsNotNullPipe],
})
export class IsNotNullPipeModule {}
