import {ModuleWithProviders, NgModule} from '@angular/core';
import {WebWorkerThreadService} from '@angular-ru/cdk/webworker';

import {PlainTableComposerService} from './plain-table-composer.service';

@NgModule({
    providers: [WebWorkerThreadService],
})
export class PlainTableComposerModule {
    public static forRoot(): ModuleWithProviders<PlainTableComposerModule> {
        return {
            ngModule: PlainTableComposerModule,
            providers: [PlainTableComposerService],
        };
    }
}
