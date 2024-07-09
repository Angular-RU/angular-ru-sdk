import {Nullable} from '@angular-ru/cdk/typings';

export function removeNonNumericSymbols(value?: Nullable<string>): string {
    return value?.replace(/[^\d,.-]/g, '').replace(/^\.|^,/, '') ?? '';
}
