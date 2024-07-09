import {Couple} from '@angular-ru/cdk/typings';

export function partition<T>(
    forArray: T[],
    predicate: (element: T, index?: number, array?: T[]) => boolean,
): Couple<T[]> {
    return forArray.reduce(
        (partitioning: Couple<T[]>, element: T, ...rest: [number, T[]]): Couple<T[]> => {
            /**
             * Displays which array of a couple the value should fall into, depending on the predicate.
             * @type {number}
             */
            const fittingToPredicateCoupleIndex: number = predicate(element, ...rest)
                ? 0
                : 1;

            partitioning[fittingToPredicateCoupleIndex]?.push(element);

            return partitioning;
        },
        [[], []] as Couple<T[]>,
    );
}
