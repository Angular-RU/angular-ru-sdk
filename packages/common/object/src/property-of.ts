export function propertyOf<T>(name: keyof T): string {
    return name as string;
}
