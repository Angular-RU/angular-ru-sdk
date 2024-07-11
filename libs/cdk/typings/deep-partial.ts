export type DeepPartial<T = any> = {
    [P in keyof T]?: T[P] extends Array<infer U>
        ? Array<DeepPartial<U>>
        : T[P] extends ReadonlyArray<infer R>
          ? ReadonlyArray<DeepPartial<R>>
          : DeepPartial<T[P]>;
};
