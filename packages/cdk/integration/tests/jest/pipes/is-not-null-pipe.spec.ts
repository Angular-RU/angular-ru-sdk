import { IsNotNullPipeModule, IsNotNullPipe } from '@angular-ru/cdk/pipes';
import { TestBed } from '@angular/core/testing';

describe('is not null pipe', () => {
    let pipe: IsNotNullPipe;

    beforeEach(() => {
        TestBed.configureTestingModule({ imports: [IsNotNullPipeModule] }).compileComponents();
        pipe = TestBed.inject(IsNotNullPipe);
    });

    it('is not null', () => {
        expect(pipe.transform({ a: { b: { c: 'str' } } })).toEqual(true);
        expect(pipe.transform(0)).toEqual(true);
        expect(pipe.transform(NaN)).toEqual(true);
        expect(pipe.transform(null)).toEqual(false);
        expect(pipe.transform(undefined)).toEqual(false);
    });
});
