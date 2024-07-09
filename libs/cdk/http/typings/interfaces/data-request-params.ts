import {HttpHeaders, HttpParams} from '@angular/common/http';

import {DataResponseType} from './data-client-request-options';

export interface DataHttpRequestOptions {
    body: unknown;
    headers: HttpHeaders;
    params: HttpParams;
    responseType: DataResponseType;
    withCredentials: boolean;
    reportProgress: boolean;
}
