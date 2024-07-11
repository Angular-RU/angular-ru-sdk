import {HttpParams} from '@angular/common/http';
import {Nullable, PlainObject} from '@angular-ru/cdk/typings';

export type DataHeadersParams = Record<string, string[] | string>;

export type DataResponseType = 'arraybuffer' | 'blob' | 'json' | 'text';

export interface DataClientRequestOptions<T extends PlainObject = any> {
    /**
     * @description
     * prepare your model before sending on server
     */
    nullInsteadEmpty: boolean;

    /**
     * @description
     * default host url mapping
     */
    hostUrl: Nullable<string>;

    /**
     * @description
     * default base url mapping relates to host
     * example: `${host}/${baseUrl}`
     */
    baseUrl: Nullable<string>;

    /**
     * @description
     * custom http headers
     */
    headers: DataHeadersParams;

    /**
     * @description
     * query params for request
     */
    queryParams: HttpParams | Nullable<PlainObject>;

    /**
     * @description
     * path variables in url
     */
    pathVariables: Nullable<PlainObject>;

    /**
     * @description
     * query params for request
     */
    responseType: DataResponseType;

    /**
     * @description
     * report progress
     */
    reportProgress: boolean;

    /**
     * @description
     * emit success event about sent request
     */
    emitSuccess: boolean;

    /**
     * @description
     * emit failure event about sent request
     */
    emitFailure: boolean;

    /**
     * @description
     * body request
     */
    body: unknown;

    /**
     * @description
     * custom properties
     */
    additionalOptions: T;

    /**
     * @description
     * limit on the number of concurrent requests
     */
    limitConcurrency: number;
}
