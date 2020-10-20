import { Any, PlainObject } from '@angular-ru/common/typings';

export interface DataHeadersParams {
    [key: string]: string | string[];
}

export type DataResponseType = 'arraybuffer' | 'blob' | 'json' | 'text';

export interface DataClientRequestOptions<T extends PlainObject = Any> {
    /**
     * @description
     * prepare your model before sending on server
     */
    nullInsteadEmpty: boolean;

    /**
     * @description
     * default host url mapping
     */
    hostUrl: string | null;

    /**
     * @description
     * default base url mapping relates to host
     * example: `${host}/${baseUrl}`
     */
    baseUrl: string | null;

    /**
     * @description
     * custom http headers
     */
    headers: DataHeadersParams;

    /**
     * @description
     * query params for request
     */
    queryParams: PlainObject;

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
}
