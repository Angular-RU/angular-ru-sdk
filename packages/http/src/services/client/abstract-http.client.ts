import { replaceWithNull } from '@angular-ru/common/object';
import { Any, PlainObject } from '@angular-ru/common/typings';
import { DataHttpRequestParams, DataHttpRequestType, DataRequestOptions } from '@angular-ru/http/typings';
import { getHttpHeader, getHttpParams } from '@angular-ru/http/utils';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DefaultUrlSerializer } from '@angular/router';
import { Observable } from 'rxjs';

import { DataConfiguratorService } from '../data-configurator.service';

@Injectable()
export abstract class AbstractHttpClient {
    protected constructor(protected http: HttpClient, protected configurator: DataConfiguratorService) {}

    public static combineOptions<T>(path: string, options: Partial<DataRequestOptions>): DataHttpRequestParams {
        const httpParams: HttpParams = getHttpParams(path, options.queryParams);
        const headers: HttpHeaders = getHttpHeader(options.headers);
        return {
            headers,
            params: httpParams,
            withCredentials: false,
            responseType: options.responseType || 'json',
            reportProgress: options.reportProgress || false,
            body: AbstractHttpClient.createHttpBody<T>(options.body as T, options)
        };
    }

    public static parseQueryParams(path: string): PlainObject {
        return new DefaultUrlSerializer().parse(path).queryParams;
    }

    private static createHttpBody<T>(payload: T, options: Partial<DataRequestOptions>): T | FormData {
        if (payload instanceof FormData) {
            return payload;
        }

        // eslint-disable-next-line @typescript-eslint/tslint/config
        const body: T = payload as T;
        return options.nullInsteadEmpty ? replaceWithNull(body) : body;
    }

    public get<T = Any, R = T>(path: string, options: Partial<DataRequestOptions> = {}): Observable<R> {
        return this.request<T, R>(DataHttpRequestType.GET, path, this.configurator.mergeGlobalOptionsWith(options));
    }

    public post<T = Any, R = T>(path: string, options: Partial<DataRequestOptions> = {}): Observable<R> {
        return this.request<T, R>(DataHttpRequestType.POST, path, this.configurator.mergeGlobalOptionsWith(options));
    }

    public put<T = Any, R = T>(path: string, options: Partial<DataRequestOptions> = {}): Observable<R> {
        return this.request<T, R>(DataHttpRequestType.PUT, path, this.configurator.mergeGlobalOptionsWith(options));
    }

    public delete<T = Any, R = T>(path: string, options: Partial<DataRequestOptions> = {}): Observable<R> {
        return this.request<T, R>(DataHttpRequestType.DELETE, path, this.configurator.mergeGlobalOptionsWith(options));
    }

    public abstract request<T = Any, R = T>(method: string, path: string, options: DataRequestOptions): Observable<R>;
}
