import {HttpHeaders} from '@angular/common/http';
import {DataHeadersParams} from '@angular-ru/cdk/http/typings';
import {clean} from '@angular-ru/cdk/object';

export function getHttpHeader(params: DataHeadersParams = {}): HttpHeaders {
    return new HttpHeaders(clean(params));
}
