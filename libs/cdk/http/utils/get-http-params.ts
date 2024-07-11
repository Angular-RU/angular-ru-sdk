import {HttpParams} from '@angular/common/http';
import {clean} from '@angular-ru/cdk/object';
import {Nullable, PlainObject} from '@angular-ru/cdk/typings';

import {parseQueryParams} from './parse-query-params';

export function getHttpParams(
    path: string,
    params: HttpParams | Nullable<PlainObject>,
): HttpParams {
    if (params instanceof HttpParams) {
        return params;
    }

    const queryPath: PlainObject = parseQueryParams(path);
    const fromObject: PlainObject = clean({...queryPath, ...(params ?? {})});

    return new HttpParams({fromObject});
}
