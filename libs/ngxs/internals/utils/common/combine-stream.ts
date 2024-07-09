import {forkJoin, Observable} from 'rxjs';
import {map} from 'rxjs/operators';

export function combineStream(
    dispatched$: Observable<any>,
    result$: Observable<any>,
): Observable<any> {
    return forkJoin([dispatched$, result$]).pipe(
        map((combines: [any, any]): any => combines.pop()),
    );
}
