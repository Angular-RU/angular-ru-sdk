import {makeEnvironmentProviders} from '@angular/core';
import {providePlainTableComposer} from '@angular-ru/cdk/table-utils';
import {WebWorkerThreadService} from '@angular-ru/cdk/webworker';

import {ExcelService} from './excel.service';
import {ExcelBuilderService} from './excel-builder.service';
import {ExcelBuilderDefaultTextColumnInterceptor} from './excel-builder-default-text-column-interceptor.service';
import {EXCEL_BUILDER_INTERCEPTOR_TOKEN} from './excel-interceptor-text.token';

export function provideExcelBuilder() {
    return makeEnvironmentProviders([
        ExcelService,
        ExcelBuilderService,
        {
            provide: EXCEL_BUILDER_INTERCEPTOR_TOKEN,
            useClass: ExcelBuilderDefaultTextColumnInterceptor,
        },
        WebWorkerThreadService,
        providePlainTableComposer(),
    ]);
}
