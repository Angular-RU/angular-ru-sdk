import { Nullable, PlainObject } from '@angular-ru/common/typings';
import { Observable } from 'rxjs';

export interface ExcelBuilderTextColumnInterceptor {
    instant?(key?: Nullable<string>): Nullable<string>;
    getTranslationMap?(): Observable<Nullable<PlainObject>>;
}
