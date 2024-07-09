import {Injectable} from '@angular/core';
import {
    DataHttpFailureEvent,
    DataHttpInterceptor,
    DataHttpSuccessEvent,
} from '@angular-ru/cdk/http/typings';
import {Subject} from 'rxjs';

@Injectable()
export class DefaultHttpClientInterceptor implements DataHttpInterceptor {
    public success$: Subject<DataHttpSuccessEvent<any>> = new Subject();
    public errors$: Subject<DataHttpFailureEvent<any>> = new Subject();
}
