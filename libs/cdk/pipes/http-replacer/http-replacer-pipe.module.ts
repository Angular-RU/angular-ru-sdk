import {NgModule} from '@angular/core';

import {HttpReplacerPipe} from './http-replacer.pipe';

@NgModule({
    exports: [HttpReplacerPipe],
    providers: [HttpReplacerPipe],
    declarations: [HttpReplacerPipe],
})
export class HttpReplacerPipeModule {}
