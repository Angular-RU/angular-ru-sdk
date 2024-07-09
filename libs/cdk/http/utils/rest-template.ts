import {
    DataBeforeRequestOptions,
    DataClientRequestOptions,
    EmitOptions,
    RequestType,
} from '@angular-ru/cdk/http/typings';
import {Nullable, PlainObject} from '@angular-ru/cdk/typings';
import {isNil, isTrue} from '@angular-ru/cdk/utils';
import {Observable, OperatorFunction} from 'rxjs';

import {DataHttpClient} from '../services/data-http.client';

export class RestTemplate<T> {
    private markAsRequest: boolean = false;
    private _client: Nullable<DataHttpClient> = null;
    protected operators: OperatorFunction<T, any>[] = [];
    public path!: string;
    public methodType!: RequestType;

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
        if (isTrue(options.override)) {
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

    public setParams(queryParams: Nullable<PlainObject>): RestTemplate<T> {
        this.options.queryParams = queryParams;

        return this;
    }

    public setOptions(options: Partial<DataClientRequestOptions>): RestTemplate<T> {
        this.options = {...this.options, ...options};

        return this;
    }

    public asProxyObservable(): Observable<T> {
        // eslint-disable-next-line @typescript-eslint/no-this-alias
        const that: RestTemplate<T> = this;

        const fakeProxy: any = {
            restTemplateRef: that,
            pipe(...operators: OperatorFunction<T, any>[]): Observable<T> {
                that.operators.push(...operators);

                return fakeProxy;
            },
            subscribe: (): any => {
                if (!that.markAsRequest) {
                    throw new Error(
                        'You cannot invoke observable outside data request context. \n' +
                            'Use only @Get, @Post, @Put, @Delete decorators for correct call http method...',
                    );
                }
            },
        };

        return fakeProxy as Observable<T>;
    }

    public asObservable(): Observable<T> {
        this.markAsRequest = true;

        if (isNil(this._client)) {
            throw new Error('Not found http client');
        } else if (isNil(this._client?.[this.methodType])) {
            throw new Error(`Method ${this.methodType} not supported`);
        }

        const options: DataBeforeRequestOptions = this._client.createRequestOptions({
            path: this.path,
            method: this.methodType,
            options: this.options,
        });

        let stream$: Observable<T> = this._client.request(options);

        if (this.operators.length > 0) {
            for (const operator of this.operators) {
                stream$ = stream$.pipe(operator);
            }
        }

        return stream$;
    }
}
