import {HttpErrorResponse} from '@angular/common/http';

import {DataBeforeRequestOptions} from './data-before-request-options';
import {MetaDataRequest} from './meta-data-request';
import {PlainObject} from '@angular-ru/cdk/typings';

export interface DataHttpSuccessEvent<K extends PlainObject> {
    options: DataBeforeRequestOptions<K>;
    meta: MetaDataRequest;
}

export interface DataHttpFailureEvent<K extends PlainObject> {
    error: HttpErrorResponse;
    options: DataBeforeRequestOptions<K>;
    meta: MetaDataRequest;
}
