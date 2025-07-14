import {HttpErrorResponse} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {
    DataBeforeRequestOptions,
    DataClientRequestOptions,
    DataHttpRequestOptions,
    DataUrlPathSegment,
    MetaDataRequest,
} from '@angular-ru/cdk/http/typings';
import {buildUrl, makeUrlSegments} from '@angular-ru/cdk/http/utils';
import {isNil, isTrue} from '@angular-ru/cdk/utils';
import {Observable, Subscriber, Subscription, throwError} from 'rxjs';
import {catchError, finalize, take, tap} from 'rxjs/operators';

import {RestTemplate} from '../utils/rest-template';
import {AbstractHttpClient} from './abstract-http.client';

@Injectable()
export class DataHttpClient<K = unknown> extends AbstractHttpClient<K> {
    public request<T, R = T>(options: DataBeforeRequestOptions): Observable<R> {
        if (isNil(this.local)) {
            throw new Error(
                "You must use the @RestClient('controller') decorator for work correctly",
            );
        }

        const meta: MetaDataRequest = this.createMetaDataRequest(options);
        const observable$: Observable<R> = this.http.request(
            options.method,
            meta.url,
            meta.requestOptions,
        );
        const queueRequest$: Observable<R> = this.limitConcurrency.add<R>(
            observable$,
            options.clientOptions.limitConcurrency,
        );

        return new Observable<R>((subscriber: Subscriber<R>): Subscription => {
            this.interceptor.onBeforeRequest?.(options);

            return this.wrapHttpRequestWithMeta(meta, options, queueRequest$).subscribe(
                subscriber,
            );
        });
    }

    protected restTemplate<T>(
        options?: Partial<DataClientRequestOptions>,
    ): Observable<T> {
        return new RestTemplate<T>(options).asProxyObservable();
    }

    private createMetaDataRequest(options: DataBeforeRequestOptions): MetaDataRequest {
        const {emitSuccess, emitFailure}: DataClientRequestOptions =
            options.clientOptions;
        const segments: DataUrlPathSegment = makeUrlSegments(
            options.clientOptions,
            this.controllerUrl,
            options.path,
        );
        const requestOptions: DataHttpRequestOptions =
            this.createDataHttpRequestOptions(options);
        const url: string = buildUrl(segments);

        return {
            method: options.method,
            url,
            emitSuccess,
            emitFailure,
            requestOptions,
            segments,
        };
    }

    private wrapHttpRequestWithMeta<T, R = T>(
        meta: MetaDataRequest,
        options: DataBeforeRequestOptions,
        observable$: Observable<R>,
    ): Observable<R> {
        return observable$.pipe(
            tap({
                next: (response: R): void => this.onSuccess(response, meta, options),
                error: (error: unknown): void =>
                    this.onError(error as HttpErrorResponse, meta, options),
            }),
            catchError(
                (error: unknown): Observable<never> =>
                    this.onCatch(error as HttpErrorResponse, meta),
            ),
            finalize((): void => this.interceptor.onFinalizeAfterRequest?.(meta)),
            take(1),
        );
    }

    private onSuccess<R>(
        response: R,
        meta: MetaDataRequest,
        options: DataBeforeRequestOptions,
    ): void {
        if (isTrue(options.clientOptions.emitSuccess)) {
            this.interceptor.success$?.next({options, meta});
            this.interceptor.onEmitSuccess?.(response, options, meta);
        }

        this.interceptor.onTapAfterRequest?.(response, meta);
    }

    private onError(
        error: HttpErrorResponse,
        meta: MetaDataRequest,
        options: DataBeforeRequestOptions,
    ): void {
        if (isTrue(options.clientOptions.emitFailure)) {
            this.interceptor.errors$?.next({error, options, meta});
            this.interceptor.onEmitFailure?.(error, options, meta);
        }

        this.interceptor.onErrorAfterRequest?.(error, meta);
    }

    private onCatch(error: HttpErrorResponse, meta: MetaDataRequest): Observable<never> {
        return (
            this.interceptor.onCatchErrorAfterRequest?.(error, meta) ??
            throwError((): HttpErrorResponse => error)
        );
    }
}
