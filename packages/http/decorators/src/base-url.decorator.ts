import { ClassType } from '@angular-ru/common/typings';
import { isNotNil } from '@angular-ru/common/utils';
import { DataClientRequestOptions } from '@angular-ru/http/typings';
import { replaceDoubleSlash } from '@angular-ru/http/utils';

import { validateHttpParentDecorator } from './internal/validate-http-parent-decorator';

export function BaseUrl(baseUrl: string = ''): (clientClass: ClassType) => void {
    return (clientClass: ClassType): void => {
        validateHttpParentDecorator('@BaseUrl', clientClass);

        const localRef: Partial<DataClientRequestOptions> = clientClass.prototype?.['local'];

        if (isNotNil(localRef)) {
            localRef.baseUrl = replaceDoubleSlash(baseUrl);
        }
    };
}
