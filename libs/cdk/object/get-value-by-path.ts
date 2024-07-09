import {Nullable} from '@angular-ru/cdk/typings';
import {isNotNil} from '@angular-ru/cdk/utils';

// eslint-disable-next-line complexity
export function getValueByPath<T = unknown, K = T>(
    object: T,
    path: Nullable<string>,
    fallback: Nullable<K> = undefined,
): Nullable<K> {
    if ((path?.length ?? 0) < 1) {
        return object as any as K;
    }

    let result: K = object as any as K;

    const parts: string[] = path?.split('.') ?? [];
    let index: number = 0;

    for (; isNotNil(result) && index < parts.length; ++index) {
        const localIndex: string = parts?.[index] as string;

        result = (result as any)?.[localIndex];
    }

    return result ?? fallback;
}
