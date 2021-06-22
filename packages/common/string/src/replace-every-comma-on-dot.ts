import { Nullable } from '@angular-ru/common/typings';

export function replaceEveryCommaOnDot(val?: Nullable<string>): string {
    return val?.replace(/,/g, '.') ?? '';
}
