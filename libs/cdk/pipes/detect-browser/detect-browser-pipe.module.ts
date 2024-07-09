import {NgModule} from '@angular/core';

import {DetectBrowserPipe} from './detect-browser.pipe';

@NgModule({
    exports: [DetectBrowserPipe],
    providers: [DetectBrowserPipe],
    declarations: [DetectBrowserPipe],
})
export class DetectBrowserPipeModule {}
