import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

import { TooltipTextInterceptor } from './tooltip.interfaces';

@Injectable()
export class NgxTooltipTextInterceptor implements TooltipTextInterceptor {
    constructor(private readonly translate: TranslateService) {}

    public instant(value?: string | null): string | undefined | null {
        return value ? this.translate.instant(value) : value;
    }
}
