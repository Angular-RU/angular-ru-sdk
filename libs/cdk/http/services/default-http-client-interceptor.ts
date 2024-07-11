import {Injectable} from '@angular/core';
import {
    DataHttpFailureEvent,
    DataHttpInterceptor,
    DataHttpSuccessEvent,
} from '@angular-ru/cdk/http/typings';
import {Subject} from 'rxjs';

@Injectable()
export class DefaultHttpClientInterceptor implements DataHttpInterceptor {
    public success$ = new Subject<DataHttpSuccessEvent<any>>();
    public errors$ = new Subject<DataHttpFailureEvent<any>>();
}
