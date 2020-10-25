import { ClassType } from '@angular-ru/common/typings';

export function RestClient(url: string = '/'): (clientClass: ClassType) => void {
    return (clientClass: ClassType): void => {
        Object.defineProperties(clientClass.prototype, {
            controllerUrl: {
                writable: true,
                enumerable: true,
                configurable: true,
                value: url
            },
            local: {
                writable: true,
                enumerable: true,
                configurable: true,
                value: { baseUrl: url }
            }
        });
    };
}
