import { mapToVoid } from '@angular-ru/common/rxjs';
import { of } from 'rxjs';

describe('[TEST]: RxJS', () => {
    it('mapToVoid', () => {
        of([1, 2, 3])
            .pipe(mapToVoid())
            .subscribe((result) => {
                expect(result).toBeUndefined();
            });
    });
});
