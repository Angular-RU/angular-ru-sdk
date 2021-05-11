import { InjectionToken } from '@angular/core';

import { ExcelBuilderTextColumnInterceptor } from './interfaces/excel-builder-text-column-interceptor';

export const EXCEL_BUILDER_INTERCEPTOR_TOKEN: InjectionToken<ExcelBuilderTextColumnInterceptor> = new InjectionToken(
    'EXCEL_BUILDER_INTERCEPTOR_TOKEN'
);
