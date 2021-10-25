export function shallowFlat<A>(arr: A[][]): A[] {
    return arr.reduce((acc: A[], el: A[]): A[] => acc.concat(el), []);
}
