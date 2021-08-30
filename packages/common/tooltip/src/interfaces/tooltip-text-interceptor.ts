import { Nullable } from '@angular-ru/common/typings';

export interface TooltipTextInterceptor {
    instant?(value?: Nullable<string>): Nullable<string>;
}
