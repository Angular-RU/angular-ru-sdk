import { replaceWithNull } from '@angular-ru/common/object';
import { Any } from '@angular-ru/common/typings';
import {
    DataBeforeRequestOptions,
    DataClientRequestOptions,
    DataHttpInterceptor,
    DataHttpRequestOptions,
    DataHttpRequestType
} from '@angular-ru/http/typings';
import { getHttpHeader, getHttpParams } from '@angular-ru/http/utils';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { DATA_HTTP_CLIENT_INTERCEPTOR } from '../tokens/data-http-client-interceptor.token';
import { DataConfiguratorService } from './data-configurator.service';

@Injectable()
export abstract class AbstractHttpClient<K = unknown> {
    public interceptor: K & DataHttpInterceptor;
    private local: Partial<DataClientRequestOptions> = {};

    protected constructor(
        protected http: HttpClient,
        protected configurator: DataConfiguratorService,
        @Inject(DATA_HTTP_CLIENT_INTERCEPTOR) _interceptor: Any
    ) {
        this.interceptor = _interceptor;
    }

    public get<T = Any, R = T>(path: string, options: Partial<DataClientRequestOptions> = {}): Observable<R> {
        return this.request<T, R>(this.createDataBeforeRequestOptions(DataHttpRequestType.GET, path, options));
    }

    public post<T = Any, R = T>(path: string, options: Partial<DataClientRequestOptions> = {}): Observable<R> {
        return this.request<T, R>(this.createDataBeforeRequestOptions(DataHttpRequestType.POST, path, options));
    }

    public put<T = Any, R = T>(path: string, options: Partial<DataClientRequestOptions> = {}): Observable<R> {
        return this.request<T, R>(this.createDataBeforeRequestOptions(DataHttpRequestType.PUT, path, options));
    }

    public delete<T = Any, R = T>(path: string, options: Partial<DataClientRequestOptions> = {}): Observable<R> {
        return this.request<T, R>(this.createDataBeforeRequestOptions(DataHttpRequestType.DELETE, path, options));
    }

    protected createDataHttpRequestOptions<T>(options: DataBeforeRequestOptions): DataHttpRequestOptions {
        const httpParams: HttpParams = getHttpParams(options.path, options.clientOptions.queryParams);
        const headers: HttpHeaders = getHttpHeader(options.clientOptions.headers);
        return {
            withCredentials: false,
            body: this.createHttpBody<T>(options),
            responseType: options.clientOptions.responseType ?? 'json',
            reportProgress: options.clientOptions.reportProgress ?? false,
            headers: this.interceptor.onInterceptHttpHeaders?.(options, headers) ?? headers,
            params: this.interceptor.onInterceptHttpParams?.(options, httpParams) ?? httpParams
        };
    }

    protected abstract request<T = Any, R = T>(options: DataBeforeRequestOptions): Observable<R>;

    private createDataBeforeRequestOptions(
        method: string,
        path: string,
        options: Partial<DataClientRequestOptions> = {}
    ): DataBeforeRequestOptions {
        return { path, method, clientOptions: this.configurator.mergeGlobalOptionsWith(this.local, options) };
    }

    private createHttpBody<T>(options: DataBeforeRequestOptions): T | FormData {
        const payload: T = options.clientOptions.body as T;
        if (payload instanceof FormData) {
            return payload;
        }

        const body: T = this.interceptor.onInterceptBodyPayload?.(options, payload) ?? payload;
        return options.clientOptions.nullInsteadEmpty ? replaceWithNull(body) : body;
    }
}
