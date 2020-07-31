import { PlainObject } from '@angular-ru/common/typings';
import { WebWorkerThreadService } from '@angular-ru/common/webworker';
import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';

import { ExcelBuilderService } from './excel-builder.service';

@NgModule({
    imports: [CommonModule],
    providers: [ExcelBuilderService, WebWorkerThreadService]
})
export class ExcelBuilderModule {
    public static forRoot(_config: PlainObject = {}): ModuleWithProviders<ExcelBuilderModule> {
        return { ngModule: ExcelBuilderModule, providers: [] };
    }
}
