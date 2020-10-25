import { ClassType } from '@angular-ru/common/typings';
import { DataClientRequestOptions } from '@angular-ru/http/typings';

import { validateRestClient } from './internal/validate-rest-client';

export function HostUrl(url: string | null = null): (clientClass: ClassType) => void {
    return (clientClass: ClassType): void => {
        validateRestClient('@HostUrl', clientClass);

        const localRef: Partial<DataClientRequestOptions> = clientClass.prototype?.['local'];

        if (localRef) {
            localRef.hostUrl = url;
        }
    };
}
