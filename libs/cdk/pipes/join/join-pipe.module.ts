import {NgModule} from '@angular/core';

import {JoinPipe} from './join.pipe';

@NgModule({
    declarations: [JoinPipe],
    providers: [JoinPipe],
    exports: [JoinPipe],
})
export class JoinPipeModule {}
