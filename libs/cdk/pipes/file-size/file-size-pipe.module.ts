import {NgModule} from '@angular/core';

import {FileSizePipe} from './file-size.pipe';

@NgModule({
    declarations: [FileSizePipe],
    providers: [FileSizePipe],
    exports: [FileSizePipe],
})
export class FileSizePipeModule {}
