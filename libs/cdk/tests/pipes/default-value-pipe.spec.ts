import {TestBed} from '@angular/core/testing';
import {DefaultValuePipe, DefaultValuePipeModule} from '@angular-ru/cdk/pipes';
import {Nullable} from '@angular-ru/cdk/typings';

describe('default value', () => {
    let pipe: DefaultValuePipe;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [DefaultValuePipeModule],
        }).compileComponents();
        pipe = TestBed.inject(DefaultValuePipe);
    });

    it('fallback for empty', () => {
        const value: Nullable<string> = null;
        const result = pipe.transform(value);

        expect(result).toBe('-');
    });

    describe('instance', () => {
        let defaultPipe: DefaultValuePipe;

        beforeEach(() => {
            defaultPipe = new DefaultValuePipe();
        });

        it('should be correct fallback value with default pipe', () => {
            const fallback: string = 'Not found value';

            expect(defaultPipe.transform('', fallback)).toEqual(fallback);
            expect(defaultPipe.transform('\n\n\n', fallback)).toEqual(fallback);
            expect(defaultPipe.transform('\t   ', fallback)).toEqual(fallback);
            expect(defaultPipe.transform('0', fallback)).toBe('0');
        });
    });
});
