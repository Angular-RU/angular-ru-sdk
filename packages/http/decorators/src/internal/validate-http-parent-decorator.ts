import { ClassType } from '@angular-ru/common/typings';
import { isNil } from '@angular-ru/common/utils';
import { DataClientRequestOptions } from '@angular-ru/http/typings';

export function validateHttpParentDecorator(name: string, clientClass: ClassType): void {
    const local: Partial<DataClientRequestOptions> = clientClass.prototype?.['local'];

    if (isNil(local)) {
        throw new Error(`${name} should be initialized before @RestClient('controllerPath')`);
    }
}
