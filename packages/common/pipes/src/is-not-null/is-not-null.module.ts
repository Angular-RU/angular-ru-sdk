import { NgModule } from '@angular/core';

import { IsNotNullPipe } from './is-not-null.pipe';

@NgModule({
    declarations: [IsNotNullPipe],
    exports: [IsNotNullPipe],
    providers: [IsNotNullPipe]
})
export class IsNotNullModule {}
