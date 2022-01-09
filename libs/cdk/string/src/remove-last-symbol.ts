import { Nullable } from '@angular-ru/cdk/typings';

export function removeLastSymbol(val?: Nullable<string>): Nullable<string> {
    return val?.slice(0, -1);
}
