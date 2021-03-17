import { InjectionToken } from '@angular/core';

import { ExcelBuilderTextColumnInterceptor } from './excel-builder.interfaces';

export const EXCEL_BUILDER_INTERCEPTOR_TOKEN: InjectionToken<ExcelBuilderTextColumnInterceptor> = new InjectionToken(
    'EXCEL_BUILDER_INTERCEPTOR_TOKEN'
);
