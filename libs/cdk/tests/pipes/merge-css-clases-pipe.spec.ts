import {TestBed} from '@angular/core/testing';
import {MergeCssClassesPipe, MergeCssClassesPipeModule} from '@angular-ru/cdk/pipes';

describe('merge css classes pipe', (): void => {
    let pipe: MergeCssClassesPipe;

    beforeEach((): void => {
        TestBed.configureTestingModule({
            imports: [MergeCssClassesPipeModule],
        }).compileComponents();
        pipe = TestBed.inject(MergeCssClassesPipe);
    });

    it('should merge css classes', (): void => {
        expect(pipe.transform()).toEqual({});
        expect(pipe.transform(null)).toEqual({});
        expect(pipe.transform(undefined)).toEqual({});
        expect(pipe.transform(null, undefined, {}, [], new Set())).toEqual({});
        expect(pipe.transform('some-class')).toEqual({'some-class': true});
        expect(pipe.transform('some-class', [])).toEqual({'some-class': true});
        expect(pipe.transform('some-class', {})).toEqual({'some-class': true});
        expect(pipe.transform('some-class', new Set())).toEqual({'some-class': true});

        expect(pipe.transform('some-class', ['class-a', 'class-b'])).toEqual({
            'some-class': true,
            'class-a': true,
            'class-b': true,
        });

        expect(pipe.transform('some-class', {'class-a': true, 'class-b': false})).toEqual(
            {
                'some-class': true,
                'class-a': true,
                'class-b': false,
            },
        );

        expect(
            pipe.transform(
                new Set(['class-a', 'class-b']),
                ['class-c', 'class-d'],
                {'class-e': true, 'class-f': false},
                'class-g',
            ),
        ).toEqual({
            'class-a': true,
            'class-b': true,
            'class-c': true,
            'class-d': true,
            'class-e': true,
            'class-f': false,
            'class-g': true,
        });
    });
});
