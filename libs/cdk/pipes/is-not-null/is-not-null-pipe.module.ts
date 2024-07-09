import {NgModule} from '@angular/core';

import {IsNotNullPipe} from './is-not-null.pipe';

@NgModule({
    exports: [IsNotNullPipe],
    providers: [IsNotNullPipe],
    declarations: [IsNotNullPipe],
})
export class IsNotNullPipeModule {}
