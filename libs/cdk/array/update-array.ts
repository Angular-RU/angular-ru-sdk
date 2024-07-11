import {isFunctionLike} from '@angular-ru/cdk/function';
import {CompareFn, Nullable, PrimaryKey} from '@angular-ru/cdk/typings';

export function updateArray<T extends {id?: any}>(
    sourceArray: Nullable<T[]>,
    updatedArray: Nullable<T[]>,
): T[];
export function updateArray<T>(
    sourceArray: Nullable<T[]>,
    updatedArray: Nullable<T[]>,
    compareFnOrKey: CompareFn<T> | keyof T,
): T[];

// eslint-disable-next-line complexity,max-lines-per-function,sonarjs/cognitive-complexity
export function updateArray<T>(
    sourceArray: Nullable<T[]>,
    updatedArray: Nullable<T[]>,
    compareFnOrKey: CompareFn<T> | keyof T | typeof PrimaryKey.ID = PrimaryKey.ID,
): T[] {
    const preparedSourceArray: T[] = sourceArray ?? [];
    const newSourceArray: T[] = [];
    const newUpdatedArray: T[] = updatedArray?.slice() ?? [];
    const skipIndexes = new Set<number>();

    // eslint-disable-next-line unicorn/no-for-loop
    for (let i = 0; i < preparedSourceArray.length; i++) {
        const currentItem: T = preparedSourceArray[i];
        let updated = false;

        // eslint-disable-next-line unicorn/no-for-loop
        for (let j = 0; j < newUpdatedArray.length; j++) {
            if (skipIndexes.has(j)) {
                continue;
            }

            let isCompared = false;
            const newItem: T = newUpdatedArray[j];

            if (isFunctionLike<CompareFn<T>>(compareFnOrKey)) {
                isCompared = compareFnOrKey(currentItem, newItem);
            } else {
                isCompared =
                    (currentItem as any)?.[compareFnOrKey] ===
                    (newItem as any)?.[compareFnOrKey];
            }

            if (isCompared) {
                updated = true;
                newSourceArray.push(newItem);
                skipIndexes.add(j);
                break;
            }
        }

        if (!updated) {
            newSourceArray.push(currentItem);
        }
    }

    return newSourceArray;
}
