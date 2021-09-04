import { Injectable } from '@angular/core';
import { isString } from '@angular-ru/cdk/string';
import { Nullable } from '@angular-ru/cdk/typings';
import { TranslateService } from '@ngx-translate/core';

import { TooltipTextInterceptor } from '../interfaces/tooltip-text-interceptor';

@Injectable()
export class NgxTooltipTextInterceptor implements TooltipTextInterceptor {
    constructor(private readonly translate: TranslateService) {}

    public instant(value?: Nullable<string>): Nullable<string> {
        return (isString(value) as boolean) ? this.translate.instant(value as string) : value;
    }
}
