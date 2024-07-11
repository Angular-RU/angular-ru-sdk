import {isFunctionLike} from '@angular-ru/cdk/function';
import {getValueByPath} from '@angular-ru/cdk/object';
import {Nullable} from '@angular-ru/cdk/typings';
import {isNotNil} from '@angular-ru/cdk/utils';

type TrackBy<T> = (item: T) => any;

export function uniqueArrayOf<T>(list: T[], trackBy: TrackBy<T> | string): T[] {
    const uniqueMap = new Map<string, T>();

    for (const item of list) {
        let trackKey: Nullable<any>;

        if (isFunctionLike(trackBy)) {
            trackKey = trackBy(item);
        } else {
            trackKey = getValueByPath(item, trackBy);
        }

        const isValidKey: boolean = isNotNil(trackKey) && !uniqueMap.has(trackKey);

        if (isValidKey) {
            uniqueMap.set(trackKey, item);
        }
    }

    return Array.from(uniqueMap).map(([, item]: [string, T]): T => item);
}
