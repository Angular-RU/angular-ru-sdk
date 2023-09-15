/**
 * A type that combines `null` and `undefined` for convenient reference instead of `Nullable`. For example:
 * ```ts
 * const someString: string | nil = maybeGetSomeString();
 * ```
 */
declare type nil = null | undefined;
