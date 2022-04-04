// eslint-disable-next-line max-lines-per-function,complexity
export const deepFreeze: (value: any) => any = (value: any): any => {
    const isObject: boolean = typeof value === 'object' && value !== null;
    const isDate: boolean = value instanceof Date;
    const skipFreeze: boolean = !isObject || isDate;

    if (skipFreeze) {
        return value;
    }

    Object.freeze(value);

    const oIsFunction: boolean = typeof value === 'function';

    // eslint-disable-next-line @typescript-eslint/unbound-method
    const hasOwnProp: (v: PropertyKey) => boolean = Object.prototype.hasOwnProperty;

    // eslint-disable-next-line complexity
    for (const prop of Object.getOwnPropertyNames(value)) {
        if (
            hasOwnProp.call(value, prop) &&
            (oIsFunction ? prop !== 'caller' && prop !== 'callee' && prop !== 'arguments' : true) &&
            value[prop] !== null &&
            (typeof value[prop] === 'object' || typeof value[prop] === 'function') &&
            !Object.isFrozen(value[prop])
        ) {
            deepFreeze(value[prop]);
        }
    }

    return value;
};
