import { NgModule } from '@angular/core';

import { IsStringPipe } from './is-string.pipe';

@NgModule({
    declarations: [IsStringPipe],
    exports: [IsStringPipe],
    providers: [IsStringPipe]
})
export class IsStringPipeModule {}
