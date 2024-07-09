import {DataClientRequestOptions} from '@angular-ru/cdk/http/typings';
import {ClassType} from '@angular-ru/cdk/typings';
import {isNil} from '@angular-ru/cdk/utils';

export function validateHttpParentDecorator(name: string, clientClass: ClassType): void {
    const local: Partial<DataClientRequestOptions> = clientClass.prototype?.local;

    if (isNil(local)) {
        throw new Error(
            `${name} should be initialized before @RestClient('controllerPath')`,
        );
    }
}
