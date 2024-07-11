import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Inject, Injectable} from '@angular/core';
import {
    DataBeforeRequestOptions,
    DataClientRequestOptions,
    DataHttpInterceptor,
    DataHttpRequestOptions,
    RequestType,
} from '@angular-ru/cdk/http/typings';
import {getHttpHeader, getHttpParams} from '@angular-ru/cdk/http/utils';
import {replaceWithNull} from '@angular-ru/cdk/object';
import {isTrue} from '@angular-ru/cdk/utils';
import {Observable} from 'rxjs';

import {DATA_HTTP_CLIENT_INTERCEPTOR} from '../tokens/data-http-client-interceptor.token';
import {DataConfiguratorService} from './data-configurator.service';
import {LimitConcurrencyService} from './limit-concurrency.service';

interface ReqProperty {
    method: string;
    path: string;
    options: Partial<DataClientRequestOptions>;
}

@Injectable()
export abstract class AbstractHttpClient<K = unknown> {
    protected controllerUrl!: string;
    protected local!: Partial<DataClientRequestOptions>;
    public interceptor: DataHttpInterceptor & K;

    protected constructor(
        protected http: HttpClient,
        protected configurator: DataConfiguratorService,
        protected limitConcurrency: LimitConcurrencyService,
        // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
        @Inject(DATA_HTTP_CLIENT_INTERCEPTOR) _interceptor: any,
    ) {
        this.interceptor = _interceptor;
    }

    public abstract request<T = any, R = T>(
        options: DataBeforeRequestOptions,
    ): Observable<R>;

    public get<T = any, R = T>(
        path: string,
        options: Partial<DataClientRequestOptions> = {},
    ): Observable<R> {
        return this.request<T, R>(
            this.createRequestOptions({method: RequestType.GET, path, options}),
        );
    }

    public post<T = any, R = T>(
        path: string,
        options: Partial<DataClientRequestOptions> = {},
    ): Observable<R> {
        return this.request<T, R>(
            this.createRequestOptions({method: RequestType.POST, path, options}),
        );
    }

    public put<T = any, R = T>(
        path: string,
        options: Partial<DataClientRequestOptions> = {},
    ): Observable<R> {
        return this.request<T, R>(
            this.createRequestOptions({method: RequestType.PUT, path, options}),
        );
    }

    public patch<T = any, R = T>(
        path: string,
        options: Partial<DataClientRequestOptions> = {},
    ): Observable<R> {
        return this.request<T, R>(
            this.createRequestOptions({method: RequestType.PATCH, path, options}),
        );
    }

    public delete<T = any, R = T>(
        path: string,
        options: Partial<DataClientRequestOptions> = {},
    ): Observable<R> {
        return this.request<T, R>(
            this.createRequestOptions({method: RequestType.DELETE, path, options}),
        );
    }

    public createRequestOptions({
        method,
        path,
        options,
    }: ReqProperty): DataBeforeRequestOptions {
        return {
            path,
            method,
            clientOptions: this.configurator.mergeGlobalOptionsWith(
                this.local,
                options ?? {},
            ),
        };
    }

    protected createDataHttpRequestOptions<T>(
        options: DataBeforeRequestOptions,
    ): DataHttpRequestOptions {
        const httpParams: HttpParams = getHttpParams(
            options.path,
            options.clientOptions.queryParams,
        );
        const headers: HttpHeaders = getHttpHeader(options.clientOptions.headers);

        return {
            withCredentials: false,
            body: this.createHttpBody<T>(options),
            responseType: options.clientOptions.responseType ?? 'json',
            reportProgress: options.clientOptions.reportProgress ?? false,
            headers:
                this.interceptor.onInterceptHttpHeaders?.(options, headers) ?? headers,
            params:
                this.interceptor.onInterceptHttpParams?.(options, httpParams) ??
                httpParams,
        };
    }

    private createHttpBody<T>(options: DataBeforeRequestOptions): FormData | T {
        const payload: T = options.clientOptions.body as T;

        if (payload instanceof FormData) {
            return payload;
        }

        const body: T =
            this.interceptor.onInterceptBodyPayload?.(options, payload) ?? payload;

        return isTrue(options.clientOptions.nullInsteadEmpty)
            ? replaceWithNull(body)
            : body;
    }
}
