import {HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Fn} from '@angular-ru/cdk/typings';
import {Observable} from 'rxjs';
import {switchMap} from 'rxjs/operators';

export const enum HttpMockRequestId {
    LONG_REQUEST = 'long-request',
}

const HTTP_MOCK_DEFAULT_TIMEOUT = 500;

@Injectable()
export class HttpMockInterceptor implements HttpInterceptor {
    public intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<any> {
        return next.handle(request).pipe(
            switchMap(async (value: unknown): Promise<unknown> => {
                await this.emulateTimeoutIfLongRequest(request);

                return value;
            }),
        );
    }

    private async timeout(ms: number): Promise<any> {
        // eslint-disable-next-line no-restricted-properties
        return new Promise((resolve: Fn): number => window.setTimeout(resolve, ms));
    }

    private async emulateTimeoutIfLongRequest(request: HttpRequest<any>): Promise<any> {
        if (request.urlWithParams.includes(HttpMockRequestId.LONG_REQUEST)) {
            await this.timeout(HTTP_MOCK_DEFAULT_TIMEOUT);
        }
    }
}
