import {PlainObjectOf} from '@angular-ru/cdk/typings';

export function shallowMapObject<Type, ReturnType>(
    object: PlainObjectOf<Type>,
    mapper: (object_: Type, key: string) => ReturnType,
): PlainObjectOf<ReturnType> {
    const result: PlainObjectOf<ReturnType> = {};

    for (const key in object) {
        if (object.hasOwnProperty(key)) {
            result[key] = mapper(object[key], key);
        }
    }

    return result;
}
