import {NgModule} from '@angular/core';

import {DetectBrowserPipe} from './detect-browser.pipe';

@NgModule({
    declarations: [DetectBrowserPipe],
    providers: [DetectBrowserPipe],
    exports: [DetectBrowserPipe],
})
export class DetectBrowserPipeModule {}
