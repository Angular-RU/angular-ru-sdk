import { HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { PlainObject } from '@angular-ru/cdk/typings';
import { Observable, Subject } from 'rxjs';

import { DataBeforeRequestOptions } from './data-before-request-options';
import { DataHttpFailureEvent, DataHttpSuccessEvent } from './data-http-client-events';
import { MetaDataRequest } from './meta-data-request';

export interface DataHttpInterceptor<K extends PlainObject = any> {
    success$?: Subject<DataHttpSuccessEvent<K>>;
    errors$?: Subject<DataHttpFailureEvent<K>>;
    onBeforeRequest?(options: DataBeforeRequestOptions<K>): void;
    onInterceptHttpParams?(options: DataBeforeRequestOptions<K>, httpParams: HttpParams): HttpParams;
    onInterceptBodyPayload?<T>(options: DataBeforeRequestOptions<K>, body: T): T;
    onInterceptHttpHeaders?(options: DataBeforeRequestOptions<K>, headers: HttpHeaders): HttpHeaders;
    onTapAfterRequest?(response: unknown, meta: MetaDataRequest): void;
    onEmitSuccess?(response: unknown, options: DataBeforeRequestOptions<K>, meta: MetaDataRequest): void;
    onEmitFailure?(error: HttpErrorResponse, options: DataBeforeRequestOptions<K>, meta: MetaDataRequest): void;
    onErrorAfterRequest?(error: HttpErrorResponse, meta: MetaDataRequest): void;
    onCatchErrorAfterRequest?(error: HttpErrorResponse, meta: MetaDataRequest): Observable<never>;
    onFinalizeAfterRequest?(meta: MetaDataRequest): void;
}
