import {mapToVoid} from '@angular-ru/cdk/rxjs';
import {firstValueFrom, of} from 'rxjs';

describe('[TEST]: RxJS', () => {
    it('mapToVoid', async () => {
        const value$ = of([1, 2, 3]).pipe(mapToVoid());
        const result = await firstValueFrom(value$);

        expect(result).toBeUndefined();
    });
});
