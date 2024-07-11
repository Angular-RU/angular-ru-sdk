export type Join<K, P> = K extends number | string
    ? P extends number | string
        ? `${K}${'' extends P ? '' : '.'}${P}`
        : never
    : never;
