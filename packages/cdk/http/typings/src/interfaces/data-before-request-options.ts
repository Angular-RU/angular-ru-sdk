import { Any } from '@angular-ru/cdk/typings';

import { DataClientRequestOptions } from './data-client-request-options';

export interface DataBeforeRequestOptions<K = Any> {
    path: string;
    method: string;
    clientOptions: DataClientRequestOptions<K>;
}
