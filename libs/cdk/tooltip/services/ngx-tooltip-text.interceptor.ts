import {Inject, Injectable} from '@angular/core';
import {isString} from '@angular-ru/cdk/string';
import {Nullable} from '@angular-ru/cdk/typings';
import {TranslateService} from '@ngx-translate/core';

import {TooltipTextInterceptor} from '../interfaces/tooltip-text-interceptor';

@Injectable()
export class NgxTooltipTextInterceptor implements TooltipTextInterceptor {
    constructor(
        @Inject(TranslateService)
        private readonly translate: TranslateService,
    ) {}

    public instant(value?: Nullable<string>): Nullable<string> {
        return isString(value) ? this.translate.instant(value) : value;
    }
}
