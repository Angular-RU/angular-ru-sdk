import { DataHttpFailureEvent, DataHttpInterceptor, DataHttpSuccessEvent } from '@angular-ru/http/typings';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class DefaultHttpClientInterceptor implements DataHttpInterceptor {
    public success$: Subject<DataHttpSuccessEvent<unknown>> = new Subject();
    public errors$: Subject<DataHttpFailureEvent<unknown>> = new Subject();
}
