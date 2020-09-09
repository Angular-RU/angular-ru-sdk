export interface ExtraObjectOptions {
    weekType: boolean;
    deep: boolean;
}

export type ObjectExtraOptions = Partial<ExtraObjectOptions>;

export interface ObjectReduceOptions<T> {
    accumulator: T;
    key: string;
    targetValue: T;
    options: ObjectExtraOptions;
}

export type ComparableKeys<T> = T | T[] | string;
