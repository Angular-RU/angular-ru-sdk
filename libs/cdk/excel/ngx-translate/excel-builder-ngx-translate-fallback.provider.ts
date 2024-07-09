import {Provider} from '@angular/core';

import {EXCEL_BUILDER_INTERCEPTOR_TOKEN} from '../excel-interceptor-text.token';
import {ExcelNgxTranslateInterceptor} from './excel-ngx-translate.interceptor';

export const EXCEL_BUILDER_NGX_TRANSLATE_FALLBACK_PROVIDER: Provider = {
    provide: EXCEL_BUILDER_INTERCEPTOR_TOKEN,
    useClass: ExcelNgxTranslateInterceptor,
};
