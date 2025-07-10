import {makeEnvironmentProviders} from '@angular/core';

import {EXCEL_BUILDER_INTERCEPTOR_TOKEN} from '../excel-interceptor-text.token';
import {ExcelNgxTranslateInterceptor} from './excel-ngx-translate.interceptor';

export function provideExcelBuilderNgxTranslateFallback() {
    return makeEnvironmentProviders([
        {
            provide: EXCEL_BUILDER_INTERCEPTOR_TOKEN,
            useClass: ExcelNgxTranslateInterceptor,
        },
    ]);
}
