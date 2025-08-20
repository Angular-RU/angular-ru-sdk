import {inject, Injectable} from '@angular/core';
import {isString} from '@angular-ru/cdk/string';
import {Nullable} from '@angular-ru/cdk/typings';
import {TranslateService} from '@ngx-translate/core';

import {TooltipTextInterceptor} from '../interfaces/tooltip-text-interceptor';

@Injectable()
export class NgxTooltipTextInterceptor implements TooltipTextInterceptor {
    private readonly translate = inject<TranslateService>(TranslateService);

    public instant(value?: Nullable<string>): Nullable<string> {
        return isString(value) ? this.translate.instant(value) : value;
    }
}
