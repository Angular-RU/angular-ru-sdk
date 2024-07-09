import {Nullable} from '@angular-ru/cdk/typings';

export function getLastSymbol(value?: Nullable<string>): Nullable<string> {
    return value?.slice(-1);
}
