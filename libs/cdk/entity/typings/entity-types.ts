export type EntityIdType = number | string;

export type EntityDictionary<K extends number | string, V> = {
    [key in K]: V;
};

export type EmptyDictionary<K extends number | string, V> = {
    [key in K]?: V;
};

export type EntityStateValue<T> = T | ((state: T) => T);

export type EntityPatchValue<T> = Partial<T>;

export type KeysDictionary<K extends number | string> = {[key in K]?: K};
