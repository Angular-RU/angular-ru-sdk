import { Injectable } from '@angular/core';
import { Nullable, PlainObject } from '@angular-ru/common/typings';
import { isNil, isNotNil } from '@angular-ru/common/utils';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';

import { ExcelBuilderTextColumnInterceptor } from '../domain/excel-builder-text-column-interceptor';

@Injectable()
export class ExcelNgxTranslateInterceptor implements ExcelBuilderTextColumnInterceptor {
    constructor(private readonly translate: TranslateService) {}

    public instant(key?: Nullable<string>): Nullable<string> {
        return isNotNil(key) ? this.translate.instant(key) : key;
    }

    public getTranslationMap(): Observable<Nullable<PlainObject>> {
        const lang: Nullable<string> = this.translate.currentLang ?? this.translate.defaultLang;

        if (isNil(lang)) {
            throw new Error('Not found lang');
        }

        return this.translate.getTranslation(lang);
    }
}
