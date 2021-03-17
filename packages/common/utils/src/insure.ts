export function insure<
    Argument,
    UnprotectedReturn,
    FallbackType,
    ProtectedReturn extends UnprotectedReturn extends undefined ? FallbackType : UnprotectedReturn
>(fun: (...args: Argument[]) => UnprotectedReturn, fallback: FallbackType): (...args: Argument[]) => ProtectedReturn {
    return function (...args: Argument[]): ProtectedReturn {
        const value: UnprotectedReturn = fun(...args);
        return value === undefined ? (fallback as ProtectedReturn) : (value as ProtectedReturn);
    };
}
