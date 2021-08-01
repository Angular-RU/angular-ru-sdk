import { HttpHeaders } from '@angular/common/http';
import { DataHeadersParams } from '@angular-ru/common/http/typings';
import { clean } from '@angular-ru/common/object';

export function getHttpHeader(params: DataHeadersParams = {}): HttpHeaders {
    return new HttpHeaders(clean(params));
}
