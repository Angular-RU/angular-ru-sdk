import { DataHttpRequestParams } from './data-request-params';

export interface MetaDataRequest {
    url: string;
    method: string;
    showOk: boolean;
    showError: boolean;
    requestOptions: DataHttpRequestParams;
}
