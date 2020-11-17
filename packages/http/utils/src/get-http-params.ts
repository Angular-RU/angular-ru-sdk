import { HttpParams } from '@angular/common/http';
import { clean } from '@angular-ru/common/object';
import { PlainObject } from '@angular-ru/common/typings';

import { parseQueryParams } from './parse-query-params';

export function getHttpParams(path: string, params: PlainObject = {}): HttpParams {
    const queryPath: PlainObject = parseQueryParams(path);
    const fromObject: PlainObject = clean({ ...queryPath, ...params });
    return new HttpParams({ fromObject });
}
