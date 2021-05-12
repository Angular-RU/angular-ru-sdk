import { ClassType } from '@angular-ru/common/typings';
import { DataClientRequestOptions } from '@angular-ru/http/typings';

export function validateHttpParentDecorator(name: string, clientClass: ClassType): void {
    const local: Partial<DataClientRequestOptions> = clientClass.prototype?.['local'];

    if (!local) {
        throw new Error(`${name} should be initialized before @RestClient('controllerPath')`);
    }
}
