import { NgModule } from '@angular/core';

import { NameByPathPipe } from './name-by-path.pipe';

@NgModule({
    exports: [NameByPathPipe],
    providers: [NameByPathPipe],
    declarations: [NameByPathPipe]
})
export class NameByPathPipeModule {}
