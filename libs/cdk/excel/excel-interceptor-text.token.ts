import {InjectionToken} from '@angular/core';

import {ExcelBuilderTextColumnInterceptor} from './domain/excel-builder-text-column-interceptor';

export const EXCEL_BUILDER_INTERCEPTOR_TOKEN =
    new InjectionToken<ExcelBuilderTextColumnInterceptor>(
        'EXCEL_BUILDER_INTERCEPTOR_TOKEN',
    );
