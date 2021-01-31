import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { finalize, switchMap } from 'rxjs/operators';

@Injectable()
export class LimitConcurrencyService {
    private activeRequestCount: number = 0;
    private requestQueue: Subject<boolean>[] = [];

    public queue<R>(request: Observable<R>, limitConcurrency?: number): Observable<R> {
        if (!limitConcurrency || this.activeRequestCount < limitConcurrency) {
            this.activeRequestCount++;
            return this.onComplete(request);
        } else {
            const requestInLine: Subject<boolean> = new Subject<boolean>();
            this.requestQueue.push(requestInLine);
            return requestInLine.pipe(switchMap((): Observable<R> => this.onComplete(request)));
        }
    }

    private onComplete<R>(request: Observable<R>): Observable<R> {
        return request.pipe(
            finalize((): void => {
                this.activeRequestCount--;
                this.executeFromQueue();
            })
        );
    }

    private executeFromQueue(): void {
        const requestInLine: Subject<boolean> | undefined = this.requestQueue.shift();
        if (requestInLine) {
            this.activeRequestCount++;
            requestInLine.next(true);
            requestInLine.complete();
        }
    }
}
