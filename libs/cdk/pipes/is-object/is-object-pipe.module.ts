import {NgModule} from '@angular/core';

import {IsObjectPipe} from './is-object.pipe';

@NgModule({
    declarations: [IsObjectPipe],
    providers: [IsObjectPipe],
    exports: [IsObjectPipe],
})
export class IsObjectPipeModule {}
