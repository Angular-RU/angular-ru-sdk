export type Tuple<
    ItemType,
    Length extends number = 1,
    Base extends unknown[] = [],
> = Base['length'] extends Length ? Base : Tuple<ItemType, Length, [ItemType, ...Base]>;
