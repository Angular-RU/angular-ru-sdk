export interface SelectFromTableResult<T> {
    items: T[];
    first: T | null | undefined;
}
