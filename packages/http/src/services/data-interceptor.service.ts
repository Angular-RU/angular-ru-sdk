import { MetaDataRequest } from '@angular-ru/http/typings';
import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';

@Injectable()
export class DataInterceptorService {
    public preRunRequest(_lock: boolean): void {
        //
    }

    public tap(_data: unknown, _meta: MetaDataRequest): void {
        //
    }

    public error(_error: HttpErrorResponse, meta: MetaDataRequest): void {
        const { showError }: MetaDataRequest = meta;

        if (showError) {
            //
        }
    }

    public finalize(): void {
        //
    }

    public catchError(error: HttpErrorResponse, _meta: MetaDataRequest): Observable<never> {
        return throwError(error);
    }
}
