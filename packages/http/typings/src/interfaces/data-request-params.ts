import { HttpHeaders, HttpParams } from '@angular/common/http';

import { DataResponseType } from './data-request-options';

export interface DataHttpRequestParams {
    body: unknown;
    headers: HttpHeaders;
    params: HttpParams;
    responseType: DataResponseType;
    withCredentials: boolean;
    reportProgress: boolean;
}
