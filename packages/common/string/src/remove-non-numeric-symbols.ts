import { Nullable } from '@angular-ru/common/typings';

export function removeNonNumericSymbols(val?: Nullable<string>): string {
    return val?.replace(/[^\d,.-]/g, '').replace(/^\.|^,/, '') ?? '';
}
