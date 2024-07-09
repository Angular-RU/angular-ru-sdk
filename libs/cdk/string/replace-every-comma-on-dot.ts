import {Nullable} from '@angular-ru/cdk/typings';

export function replaceEveryCommaOnDot(value?: Nullable<string>): string {
    return value?.replace(/,/g, '.') ?? '';
}
