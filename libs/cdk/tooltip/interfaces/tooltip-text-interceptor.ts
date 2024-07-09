import {Nullable} from '@angular-ru/cdk/typings';

export interface TooltipTextInterceptor {
    instant?(value?: Nullable<string>): Nullable<string>;
}
