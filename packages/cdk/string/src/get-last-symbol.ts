import { Nullable } from '@angular-ru/cdk/typings';

export function getLastSymbol(val?: Nullable<string>): Nullable<string> {
    return val?.slice(-1);
}
