export function unique<T>(value: T, index: number, self: any[]): boolean {
    return self.indexOf(value) === index;
}
