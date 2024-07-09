import {DataClientRequestOptions} from '@angular-ru/cdk/http/typings';
import {ClassType} from '@angular-ru/cdk/typings';
import {isNotNil} from '@angular-ru/cdk/utils';

import {validateHttpParentDecorator} from './internal/validate-http-parent-decorator';

export function HostUrl(hostUrl: string = ''): (clientClass: ClassType) => void {
    return (clientClass: ClassType): void => {
        validateHttpParentDecorator('@HostUrl', clientClass);

        const localRef: Partial<DataClientRequestOptions> = clientClass.prototype?.local;

        if (isNotNil(localRef)) {
            localRef.hostUrl = hostUrl;
        }
    };
}
