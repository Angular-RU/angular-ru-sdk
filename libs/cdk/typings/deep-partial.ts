export type DeepPartial<T = any> = {
    [P in keyof T]?: T[P] extends (infer U)[]
        ? DeepPartial<U>[]
        : T[P] extends readonly (infer R)[]
          ? readonly DeepPartial<R>[]
          : DeepPartial<T[P]>;
};
