export function instanceOfPlainObject(plainObject: any): boolean {
    return Object.prototype.toString.call(plainObject) === '[object Object]';
}
