import { IsObjectPipe, IsObjectPipeModule } from '@angular-ru/cdk/pipes';
import { TestBed } from '@angular/core/testing';

describe('is object pipe', () => {
    let pipe: IsObjectPipe;

    beforeEach(() => {
        TestBed.configureTestingModule({ imports: [IsObjectPipeModule] }).compileComponents();
        pipe = TestBed.inject(IsObjectPipe);
    });

    it('is object', () => {
        class A {}

        expect(pipe.transform(new A())).toEqual(true);
        expect(pipe.transform({ a: { b: { c: 'str' } } })).toEqual(true);

        expect(pipe.transform(0)).toEqual(false);
        expect(pipe.transform([])).toEqual(false);
        expect(pipe.transform(NaN)).toEqual(false);
        expect(pipe.transform(Infinity)).toEqual(false);
        expect(pipe.transform(null)).toEqual(false);
        expect(pipe.transform(undefined)).toEqual(false);
    });
});
