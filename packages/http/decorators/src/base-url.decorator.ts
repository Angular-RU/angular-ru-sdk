import { ClassType } from '@angular-ru/common/typings';
import { DataClientRequestOptions } from '@angular-ru/http/typings';
import { replaceDoubleSlash } from '@angular-ru/http/utils';

import { validateRestClient } from './internal/validate-rest-client';

export function BaseUrl(url: string | null = null): (clientClass: ClassType) => void {
    return (clientClass: ClassType): void => {
        validateRestClient('@BaseUrl', clientClass);

        const controllerUrl: string | undefined = clientClass.prototype?.['controllerUrl'];
        const localRef: Partial<DataClientRequestOptions> = clientClass.prototype?.['local'];

        if (localRef) {
            localRef.baseUrl = replaceDoubleSlash(`${url ?? '/'}/${controllerUrl ?? '/'}`);
        }
    };
}
