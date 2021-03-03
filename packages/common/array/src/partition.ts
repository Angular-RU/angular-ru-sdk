import { Couple } from '@angular-ru/common/typings';

export function partition<T>(
    forArray: T[],
    callback: (element: T, index?: number, array?: T[]) => boolean
): Couple<T[]> {
    return forArray.reduce(
        (partitioning: Couple<T[]>, element: T, ...rest: [number, T[]]): Couple<T[]> => {
            partitioning[callback(element, ...rest) ? 0 : 1].push(element);
            return partitioning;
        },
        [[], []]
    );
}
