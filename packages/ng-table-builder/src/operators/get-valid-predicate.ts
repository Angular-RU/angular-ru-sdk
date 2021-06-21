import { Nullable } from '@angular-ru/common/typings';

export function getValidPredicate<T>(leftPredicate?: Nullable<T>, rightPredicate?: T): T {
    return leftPredicate === null ? rightPredicate! : leftPredicate!;
}
