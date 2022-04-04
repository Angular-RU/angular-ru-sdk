import { DataClientRequestOptions } from './data-client-request-options';

export interface DataBeforeRequestOptions<K = any> {
    path: string;
    method: string;
    clientOptions: DataClientRequestOptions<K>;
}
