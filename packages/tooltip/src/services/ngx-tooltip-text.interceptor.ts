import { Injectable } from '@angular/core';
import { isString } from '@angular-ru/common/string';
import { TranslateService } from '@ngx-translate/core';

import { TooltipTextInterceptor } from '../interfaces/tooltip-text-interceptor';

@Injectable()
export class NgxTooltipTextInterceptor implements TooltipTextInterceptor {
    constructor(private readonly translate: TranslateService) {}

    public instant(value?: string | null): string | undefined | null {
        return (isString(value) as boolean) ? this.translate.instant(value as string) : value;
    }
}
