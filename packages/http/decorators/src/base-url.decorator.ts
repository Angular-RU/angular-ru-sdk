import { ClassType } from '@angular-ru/common/typings';
import { DataClientRequestOptions } from '@angular-ru/http/typings';
import { replaceDoubleSlash } from '@angular-ru/http/utils';

import { validateRestClient } from './internal/validate-rest-client';

export function BaseUrl(baseUrl: string = ''): (clientClass: ClassType) => void {
    return (clientClass: ClassType): void => {
        validateRestClient('@BaseUrl', clientClass);

        const localRef: Partial<DataClientRequestOptions> = clientClass.prototype?.['local'];

        if (localRef) {
            localRef.baseUrl = replaceDoubleSlash(baseUrl);
        }
    };
}
