import { Injectable } from '@angular/core';
import { PlainObject } from '@angular-ru/common/typings';
import { isNil } from '@angular-ru/common/utils';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';

import { ExcelBuilderTextColumnInterceptor } from '../interfaces/excel-builder-text-column-interceptor';

@Injectable()
export class ExcelNgxTranslateInterceptor implements ExcelBuilderTextColumnInterceptor {
    constructor(private readonly translate: TranslateService) {}

    public instant(key?: string | null): string | undefined | null {
        return key ? this.translate.instant(key) : key;
    }

    public getTranslatedColumn(): Observable<PlainObject | null> {
        const lang: string | undefined = this.translate.currentLang ?? this.translate.defaultLang;

        if (isNil(lang)) {
            throw new Error('Not found lang');
        }

        return this.translate.getTranslation(lang);
    }
}
