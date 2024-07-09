import {NgModule} from '@angular/core';

import {FileSizePipe} from './file-size.pipe';

@NgModule({
    exports: [FileSizePipe],
    providers: [FileSizePipe],
    declarations: [FileSizePipe],
})
export class FileSizePipeModule {}
