import { Nullable } from '@angular-ru/cdk/typings';

export function getValidPredicate<T>(leftPredicate?: Nullable<T>, rightPredicate?: T): T {
    return leftPredicate === null ? rightPredicate! : leftPredicate!;
}
