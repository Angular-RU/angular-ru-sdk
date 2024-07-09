import {Nullable} from '@angular-ru/cdk/typings';

export function removeLastSymbol(value?: Nullable<string>): Nullable<string> {
    return value?.slice(0, -1);
}
