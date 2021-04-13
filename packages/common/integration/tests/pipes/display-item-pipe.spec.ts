import { DisplayItemPipe, DisplayItemPipeModule } from '@angular-ru/common/pipes';
import { TestBed } from '@angular/core/testing';

describe('display item pipe', () => {
    let pipe: DisplayItemPipe;

    beforeEach(() => {
        TestBed.configureTestingModule({ imports: [DisplayItemPipeModule] }).compileComponents();
        pipe = TestBed.inject(DisplayItemPipe);
    });

    it('should return string as item name', () => {
        expect(pipe.transform(undefined)).toEqual('');
        expect(pipe.transform(null)).toEqual('');
        expect(pipe.transform(NaN)).toEqual('');
        expect(pipe.transform([])).toEqual('');
        expect(pipe.transform('')).toEqual('');
        expect(pipe.transform('a')).toEqual('a');
        expect(pipe.transform({ title: 'a' }, 'title')).toEqual('a');
        expect(pipe.transform({ value: { name: 'a' } }, 'value.name')).toEqual('a');
        expect(pipe.transform({ value: { name: [] } }, 'value.name')).toEqual('');
        expect(() => {
            pipe.transform({ name: 'a' });
        }).toThrow(new Error('attribute "displayKey" can not be empty if input item has "object" type'));
    });
});
