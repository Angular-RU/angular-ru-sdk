import { DataHttpRequestOptions } from './data-request-params';

export interface MetaDataRequest {
    url: string;
    method: string;
    emitSuccess: boolean;
    emitFailure: boolean;
    requestOptions: DataHttpRequestOptions;
}
