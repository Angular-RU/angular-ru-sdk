import {HttpErrorResponse} from '@angular/common/http';
import {PlainObject} from '@angular-ru/cdk/typings';

import {DataBeforeRequestOptions} from './data-before-request-options';
import {MetaDataRequest} from './meta-data-request';

export interface DataHttpSuccessEvent<K extends PlainObject> {
    options: DataBeforeRequestOptions<K>;
    meta: MetaDataRequest;
}

export interface DataHttpFailureEvent<K extends PlainObject> {
    error: HttpErrorResponse;
    options: DataBeforeRequestOptions<K>;
    meta: MetaDataRequest;
}
