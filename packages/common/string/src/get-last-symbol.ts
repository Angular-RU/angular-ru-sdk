import { Nullable } from '@angular-ru/common/typings';

export function getLastSymbol(val?: Nullable<string>): Nullable<string> {
    return val?.slice(-1);
}
