import { Any } from '@angular-ru/common/typings';
import {
    DataHttpRequestParams,
    DataRequestOptions,
    DataUrlPathSegment,
    MetaDataRequest
} from '@angular-ru/http/typings';
import { getUrlSegments, urlParse } from '@angular-ru/http/utils';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, finalize, take, tap } from 'rxjs/operators';

import { DataConfiguratorService } from '../data-configurator.service';
import { DataInterceptorService } from '../data-interceptor.service';
import { AbstractHttpClient } from './abstract-http.client';

@Injectable()
export class DataHttpClient extends AbstractHttpClient {
    constructor(
        protected http: HttpClient,
        protected configurator: DataConfiguratorService,
        private readonly preprocessor: DataInterceptorService
    ) {
        super(http, configurator);
    }

    public request<T, R = T>(method: string, path: string, options: DataRequestOptions): Observable<R> {
        const meta: MetaDataRequest = this.getMetaDataByOptions(method, path, options);
        this.preprocessor.preRunRequest(options.lock);
        return this.requestInterceptor<T, R>(meta, this.http.request(method, meta.url, meta.requestOptions));
    }

    private getMetaDataByOptions<K>(method: string, path: string, options: DataRequestOptions): MetaDataRequest {
        const { showOk, showError }: DataRequestOptions = options;
        const segments: DataUrlPathSegment = getUrlSegments(options);
        const requestOptions: DataHttpRequestParams = AbstractHttpClient.combineOptions<K>(path, options);
        const url: string = urlParse(path, segments);
        return { method, url, showOk, showError, requestOptions };
    }

    private requestInterceptor<T, R = T>(meta: MetaDataRequest, observable: Observable<R>): Observable<R> {
        return observable.pipe(
            tap(
                (response: Any): void => this.preprocessor.tap(response, meta),
                (error: HttpErrorResponse): void => this.preprocessor.error(error, meta)
            ),
            catchError((err: HttpErrorResponse): Observable<never> => this.preprocessor.catchError(err, meta)),
            finalize((): void => this.preprocessor.finalize()),
            take(1)
        );
    }
}
