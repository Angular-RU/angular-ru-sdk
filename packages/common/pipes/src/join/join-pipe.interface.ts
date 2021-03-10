export type JoinMapTransformer<T> = (item: T, index: number, array: T[]) => string;

export interface JoinPipeOptions<T> {
    separator?: string;
    mapTransformer?: JoinMapTransformer<T>;
}
