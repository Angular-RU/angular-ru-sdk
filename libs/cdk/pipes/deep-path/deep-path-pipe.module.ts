import {NgModule} from '@angular/core';

import {DeepPathPipe} from './deep-path.pipe';

@NgModule({
    exports: [DeepPathPipe],
    providers: [DeepPathPipe],
    declarations: [DeepPathPipe],
})
export class DeepPathPipeModule {}
