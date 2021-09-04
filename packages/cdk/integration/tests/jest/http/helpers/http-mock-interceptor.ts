import { HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Any, Fn } from '@angular-ru/cdk/typings';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

export const enum HttpMockRequestId {
    LONG_REQUEST = 'long-request'
}

const HTTP_MOCK_DEFAULT_TIMEOUT: number = 500;

@Injectable()
export class HttpMockInterceptor implements HttpInterceptor {
    public intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<Any> {
        return next.handle(req).pipe(
            switchMap(async (value: unknown): Promise<unknown> => {
                await this.emulateTimeoutIfLongRequest(req);
                return value;
            })
        );
    }

    private timeout(ms: number): Promise<Any> {
        return new Promise((resolve: Fn): number => window.setTimeout(resolve, ms));
    }

    private async emulateTimeoutIfLongRequest(req: HttpRequest<Any>): Promise<Any> {
        if (req.urlWithParams.includes(HttpMockRequestId.LONG_REQUEST)) {
            await this.timeout(HTTP_MOCK_DEFAULT_TIMEOUT);
        }
    }
}
