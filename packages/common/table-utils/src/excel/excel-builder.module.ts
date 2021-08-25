import { ModuleWithProviders, NgModule } from '@angular/core';
import { WebWorkerThreadService } from '@angular-ru/common/webworker';

import { PlainTableComposerModule } from '../plain-table-composer/plain-table-composer.module';
import { ExcelService } from './excel.service';
import { ExcelBuilderService } from './excel-builder.service';
import { ExcelBuilderDefaultTextColumnInterceptor } from './excel-builder-default-text-column-interceptor.service';
import { EXCEL_BUILDER_INTERCEPTOR_TOKEN } from './excel-interceptor-text.token';

@NgModule({
    imports: [PlainTableComposerModule.forRoot()],
    providers: [WebWorkerThreadService]
})
export class ExcelBuilderModule {
    public static forRoot(): ModuleWithProviders<ExcelBuilderModule> {
        return {
            ngModule: ExcelBuilderModule,
            providers: [
                ExcelService,
                ExcelBuilderService,
                { provide: EXCEL_BUILDER_INTERCEPTOR_TOKEN, useClass: ExcelBuilderDefaultTextColumnInterceptor }
            ]
        };
    }
}
