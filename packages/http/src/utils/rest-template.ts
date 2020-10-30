import { Any, PlainObject } from '@angular-ru/common/typings';
import { DataBeforeRequestOptions, DataClientRequestOptions, EmitOptions, RequestType } from '@angular-ru/http/typings';
import { Observable, OperatorFunction } from 'rxjs';

import { DataHttpClient } from '../services/data-http.client';

export class RestTemplate<T> {
    public path!: string;
    public methodType!: RequestType;
    protected operators: OperatorFunction<T, Any>[] = [];
    private markAsRequest: boolean = false;
    private _client: DataHttpClient | null = null;

    constructor(public options: Partial<DataClientRequestOptions> = {}) {}

    public setPath(path: string): RestTemplate<T> {
        this.path = path;
        return this;
    }

    public setMethodType(type: RequestType): RestTemplate<T> {
        this.methodType = type;
        return this;
    }

    public setClient(client: DataHttpClient): RestTemplate<T> {
        this._client = client;
        return this;
    }

    public setEmitOptions(options: EmitOptions): RestTemplate<T> {
        if (options.override) {
            this.options.emitSuccess = options.emitSuccess;
            this.options.emitFailure = options.emitFailure;
        } else {
            this.options.emitSuccess = this.options.emitSuccess ?? options.emitSuccess;
            this.options.emitFailure = this.options.emitFailure ?? options.emitFailure;
        }

        return this;
    }

    public setBody(body: unknown): RestTemplate<T> {
        this.options.body = body;
        return this;
    }

    public setParams(queryParams: PlainObject | undefined): RestTemplate<T> {
        this.options.queryParams = queryParams;
        return this;
    }

    public setOptions(options: Partial<DataClientRequestOptions>): RestTemplate<T> {
        this.options = { ...this.options, ...options };
        return this;
    }

    public asProxyObservable(): Observable<T> {
        // eslint-disable-next-line @typescript-eslint/no-this-alias
        const that: RestTemplate<T> = this;

        const fakeProxy: Any = {
            restTemplateRef: that,
            pipe(...operators: OperatorFunction<T, Any>[]): Observable<T> {
                that.operators.push(...operators);
                return fakeProxy;
            },
            subscribe: (): Any => {
                if (!that.markAsRequest) {
                    throw new Error(
                        'You cannot invoke observable outside data request context. \n' +
                            'Use only @Get, @Post, @Put, @Delete decorators for correct call http method...'
                    );
                }
            }
        };

        return fakeProxy as Observable<T>;
    }

    // noinspection JSUnusedGlobalSymbols
    protected asObservable(): Observable<T> {
        this.markAsRequest = true;

        if (!this._client) {
            throw new Error('Not found http client');
        } else if (!(this._client as Any)?.[this.methodType]) {
            throw new Error(`Method ${this.methodType} not supported`);
        }

        const options: DataBeforeRequestOptions = this._client['createRequestOptions']({
            path: this.path,
            method: this.methodType,
            options: this.options
        });

        let stream: Observable<T> = this._client['request'](options);

        if (this.operators.length) {
            this.operators.forEach((operator: OperatorFunction<T, Any>): void => {
                stream = stream.pipe(operator);
            });
        }

        return stream;
    }
}
