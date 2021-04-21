import { PlainObject } from '@angular-ru/common/typings';
import { Observable } from 'rxjs';

export interface ExcelBuilderTextColumnInterceptor {
    instant?(key?: string | null): string | undefined | null;

    getTranslatedColumn?(): Observable<PlainObject | null>;
}
