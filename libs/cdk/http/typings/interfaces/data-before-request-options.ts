import {PlainObject} from '@angular-ru/cdk/typings';

import {DataClientRequestOptions} from './data-client-request-options';

export interface DataBeforeRequestOptions<K extends PlainObject = any> {
    path: string;
    method: string;
    clientOptions: DataClientRequestOptions<K>;
}
