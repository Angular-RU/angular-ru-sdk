import { ClassType } from '@angular-ru/common/typings';
import { isNotNil } from '@angular-ru/common/utils';
import { DataClientRequestOptions } from '@angular-ru/http/typings';

import { validateHttpParentDecorator } from './internal/validate-http-parent-decorator';

export function HostUrl(hostUrl: string = ''): (clientClass: ClassType) => void {
    return (clientClass: ClassType): void => {
        validateHttpParentDecorator('@HostUrl', clientClass);

        const localRef: Partial<DataClientRequestOptions> = clientClass.prototype?.['local'];

        if (isNotNil(localRef)) {
            localRef.hostUrl = hostUrl;
        }
    };
}
