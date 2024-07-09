import {NgModule} from '@angular/core';

import {IsObjectPipe} from './is-object.pipe';

@NgModule({
    exports: [IsObjectPipe],
    providers: [IsObjectPipe],
    declarations: [IsObjectPipe],
})
export class IsObjectPipeModule {}
