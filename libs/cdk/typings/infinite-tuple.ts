import {Tuple} from './tuple';

export type InfiniteTuple<ItemType, Length extends number = 1> = [
    ...Tuple<ItemType, Length>,
    ...ItemType[],
];
