import { Nullable } from '@angular-ru/cdk/typings';

export function replaceEveryCommaOnDot(val?: Nullable<string>): string {
    return val?.replace(/,/g, '.') ?? '';
}
