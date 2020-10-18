import { HttpErrorResponse } from '@angular/common/http';

import { DataBeforeRequestOptions } from './data-before-request-options';
import { MetaDataRequest } from './meta-data-request';

export interface DataHttpSuccessEvent<K> {
    options: DataBeforeRequestOptions<K>;
    meta: MetaDataRequest;
}

export interface DataHttpFailureEvent<K> {
    error: HttpErrorResponse;
    options: DataBeforeRequestOptions<K>;
    meta: MetaDataRequest;
}
