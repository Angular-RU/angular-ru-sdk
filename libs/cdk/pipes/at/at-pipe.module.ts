import {NgModule} from '@angular/core';

import {AtPipe} from './at.pipe';

@NgModule({
    declarations: [AtPipe],
    providers: [AtPipe],
    exports: [AtPipe],
})
export class AtPipeModule {}
