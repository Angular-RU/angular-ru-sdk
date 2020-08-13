import { isFunctionLike } from '@angular-ru/common/function';
import { Any, CompareFn, PrimaryKey } from '@angular-ru/common/typings';

// eslint-disable-next-line max-lines-per-function,complexity
export function updateArray<T>(
    sourceArray: T[] | never[],
    updatedArray: T[] | never[],
    compareFnOrKey: string | CompareFn<T> = PrimaryKey.ID
): T[] {
    const newSourceArray: T[] = [];
    const newUpdatedArray: T[] = updatedArray.slice();
    const skipIndexes: Set<number> = new Set();

    for (let i: number = 0; i < sourceArray.length; i++) {
        const currentItem: T = sourceArray[i];
        let updated: boolean = false;
        for (let j: number = 0; j < newUpdatedArray.length; j++) {
            if (skipIndexes.has(j)) {
                continue;
            }

            let isCompared: boolean = false;
            const newItem: T = newUpdatedArray[j];

            if (isFunctionLike<CompareFn<T>>(compareFnOrKey)) {
                isCompared = compareFnOrKey(currentItem, newItem);
            } else {
                isCompared = (currentItem as Any)?.[compareFnOrKey] === (newItem as Any)?.[compareFnOrKey];
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
