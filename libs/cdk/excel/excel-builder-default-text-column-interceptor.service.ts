import {Injectable} from '@angular/core';

import {ExcelBuilderTextColumnInterceptor} from './domain/excel-builder-text-column-interceptor';

@Injectable()
export class ExcelBuilderDefaultTextColumnInterceptor
    implements ExcelBuilderTextColumnInterceptor {}
