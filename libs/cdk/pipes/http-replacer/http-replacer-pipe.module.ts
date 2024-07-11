import {NgModule} from '@angular/core';

import {HttpReplacerPipe} from './http-replacer.pipe';

@NgModule({
    declarations: [HttpReplacerPipe],
    providers: [HttpReplacerPipe],
    exports: [HttpReplacerPipe],
})
export class HttpReplacerPipeModule {}
