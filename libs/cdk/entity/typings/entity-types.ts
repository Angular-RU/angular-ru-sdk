export type EntityIdType = number | string;

export type EntityDictionary<K extends number | string, V> = Record<K, V>;

export type EmptyDictionary<K extends number | string, V> = Partial<Record<K, V>>;

export type EntityStateValue<T> = T | ((state: T) => T);

export type EntityPatchValue<T> = Partial<T>;

export type KeysDictionary<K extends number | string> = Partial<Record<K, K>>;
