import { Any, Nullable, PlainObject, PlainObjectOf } from '@angular-ru/cdk/typings';

import { SortableMessage } from './sortable-message';

// TODO: should be refactor for decomposition web workers
// eslint-disable-next-line max-lines-per-function
export function sortWorker<T>(message: SortableMessage<T>): T[] {
    // eslint-disable-next-line
    enum OrderType {
        DESC = 'desc',
        SKIP = 'skip'
    }

    function getValueByPath(object: PlainObject, path: string): Nullable<PlainObject> {
        return path
            ? path
                  .split('.')
                  // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
                  .reduce((value: Nullable<PlainObject>, key: string): Any => value && (value as Any)[key], object)
            : object;
    }

    function checkValueIsEmpty(value: Any): boolean {
        // note: don't use isString here
        // noinspection SuspiciousTypeOfGuard
        const nextValue: string = typeof value === 'string' ? value.trim() : value;

        return [undefined, null, NaN, '', Infinity].includes(nextValue);
    }

    class Sortable {
        public static sortByKeys(data: T[], keys: PlainObjectOf<OrderType>): Any[] {
            const countKeys: number = Object.keys(keys).length;

            if (!countKeys) {
                return data.sort(Sortable.shallowSort);
            }

            const matches: PlainObjectOf<number> = Sortable.getMatchesKeys(keys);

            return data.sort((a: unknown, b: unknown): Any => Sortable.multiSort(a, b, matches));
        }

        private static multiSort(a: unknown, b: unknown, matches: PlainObjectOf<number>): Any {
            const countKeys: number = Object.keys(matches).length;
            let sorted: number = 0;
            let ix: number = 0;

            while (sorted === 0 && ix < countKeys) {
                const key: Nullable<string> = Sortable.observeKey(matches, ix);

                // note: don't use isString here
                if (typeof key === 'string') {
                    const depth: Nullable<number> = matches[key];

                    sorted = Sortable.deepSort(key, a, b, depth);
                    ix++;
                }
            }

            return sorted;
        }

        // eslint-disable-next-line complexity
        private static getMatchesKeys(keys: PlainObjectOf<OrderType | number>): PlainObjectOf<number> {
            const matches: PlainObjectOf<number> = {};

            for (const key in keys) {
                if (keys.hasOwnProperty(key)) {
                    matches[key] =
                        // eslint-disable-next-line no-nested-ternary
                        keys[key] === OrderType.DESC || keys[key] === -1
                            ? -1
                            : // eslint-disable-next-line unicorn/no-nested-ternary
                            keys[key] === OrderType.SKIP || keys[key] === 0
                            ? 0
                            : 1;
                }
            }

            return matches;
        }

        // eslint-disable-next-line max-params-no-constructor/max-params-no-constructor
        private static deepSort(key: string, leftHand: Any, rightHand: Any, depth: Nullable<number>): number {
            const a: Any = getValueByPath(leftHand, key);
            const b: Any = getValueByPath(rightHand, key);

            return Sortable.shallowSort(a, b, depth);
        }

        private static shallowSort(a: Any, b: Any, depth?: Nullable<number>): number {
            let newB: Any = b;
            // eslint-disable-next-line no-negated-condition
            const currentDepth: Nullable<number> = depth !== null ? depth : 1;

            newB = checkValueIsEmpty(newB) ? '' : newB;

            if (a === newB) {
                return 0;
            }

            return a > newB ? currentDepth! : -1 * currentDepth!;
        }

        private static observeKey(keys: PlainObjectOf<number>, count: number): Nullable<string> {
            let key: string;
            let size: number = 0;

            for (key in keys) {
                if (keys.hasOwnProperty(key)) {
                    if (size === count) {
                        return key;
                    }

                    size++;
                }
            }

            return null;
        }
    }

    return Sortable.sortByKeys(message.source, message.definition as Any);
}
