import { HttpHeaders } from '@angular/common/http';
import { clean } from '@angular-ru/common/object';
import { DataHeadersParams } from '@angular-ru/http/typings';

export function getHttpHeader(params: DataHeadersParams = {}): HttpHeaders {
    return new HttpHeaders(clean(params));
}
