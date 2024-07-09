import {DataHttpRequestOptions} from './data-request-params';
import {DataUrlPathSegment} from './data-url-path-segment';

export interface MetaDataRequest {
    url: string;
    method: string;
    emitSuccess: boolean;
    emitFailure: boolean;
    requestOptions: DataHttpRequestOptions;
    segments: DataUrlPathSegment;
}
