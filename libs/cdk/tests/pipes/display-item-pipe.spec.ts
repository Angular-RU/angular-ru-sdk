import {TestBed} from '@angular/core/testing';
import {DisplayItemPipe} from '@angular-ru/cdk/pipes';

describe('[TEST]: display item pipe', () => {
    beforeEach(() => TestBed.configureTestingModule({providers: [DisplayItemPipe]}));

    it('should return string as item name', () => {
        const pipe = new DisplayItemPipe();

        expect(pipe.transform(undefined)).toBe('');
        expect(pipe.transform(null)).toBe('');
        expect(pipe.transform(NaN)).toBe('');
        expect(pipe.transform([])).toBe('');
        expect(pipe.transform('')).toBe('');
        expect(pipe.transform('a')).toBe('a');
        expect(pipe.transform({title: 'a'}, 'title')).toBe('a');
        expect(pipe.transform({value: {name: 'a'}}, 'value.name')).toBe('a');
        expect(pipe.transform({value: {name: []}}, 'value.name')).toBe('');
        expect(() => {
            pipe.transform({name: 'a'});
        }).toThrow(
            new Error(
                'attribute "displayKey" can not be empty if input item has "object" type',
            ),
        );
    });
});
