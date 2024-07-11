import {NgModule} from '@angular/core';

import {DeepPathPipe} from './deep-path.pipe';

@NgModule({
    declarations: [DeepPathPipe],
    providers: [DeepPathPipe],
    exports: [DeepPathPipe],
})
export class DeepPathPipeModule {}
