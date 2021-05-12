import { ClassType } from '@angular-ru/common/typings';

export function RestClient(restUrl: string = ''): (clientClass: ClassType) => void {
    return (clientClass: ClassType): void => {
        Object.defineProperties(clientClass.prototype, {
            controllerUrl: {
                writable: true,
                enumerable: true,
                configurable: true,
                value: restUrl
            },
            local: {
                writable: true,
                enumerable: true,
                configurable: true,
                value: { restUrl }
            }
        });
    };
}
