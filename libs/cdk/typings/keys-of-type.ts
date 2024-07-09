export type KeysOfType<T, Type> = {
    [K in keyof Required<T>]: Required<T>[K] extends Type ? K : never;
}[keyof T];
