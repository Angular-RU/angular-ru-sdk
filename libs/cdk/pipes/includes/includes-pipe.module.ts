import {NgModule} from '@angular/core';

import {IncludesPipe} from './includes.pipe';

@NgModule({
    declarations: [IncludesPipe],
    providers: [IncludesPipe],
    exports: [IncludesPipe],
})
export class IncludesPipeModule {}
