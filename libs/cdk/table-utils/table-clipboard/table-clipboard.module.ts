import {NgModule} from '@angular/core';
import {WebWorkerThreadService} from '@angular-ru/cdk/webworker';

import {PlainTableComposerModule} from '../plain-table-composer/plain-table-composer.module';
import {TableClipboardService} from './table-clipboard.service';

@NgModule({
    imports: [PlainTableComposerModule.forRoot()],
    providers: [WebWorkerThreadService, TableClipboardService],
})
export class TableClipboardModule {}
