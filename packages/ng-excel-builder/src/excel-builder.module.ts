import { PlainObject } from '@angular-ru/common/typings';
import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';

import { ExcelBuilderService } from './excel-builder.service';
import { WebWorkerThreadService } from './web-worker-thread.service';

@NgModule({
    imports: [CommonModule],
    providers: [ExcelBuilderService, WebWorkerThreadService]
})
export class ExcelBuilderModule {
    public static forRoot(_config: PlainObject = {}): ModuleWithProviders<ExcelBuilderModule> {
        return { ngModule: ExcelBuilderModule, providers: [] };
    }
}
