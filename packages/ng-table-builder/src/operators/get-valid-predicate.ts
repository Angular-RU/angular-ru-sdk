export function getValidPredicate<T>(leftPredicate: T | null, rightPredicate: T): T {
    return leftPredicate === null ? rightPredicate : leftPredicate;
}
