import { TestBed } from '@angular/core/testing';
import { NameByPathPipe, NameByPathPipeModule } from '@angular-ru/common/pipes';

describe('entity name pipe', () => {
    let pipe: NameByPathPipe;

    beforeEach(() => {
        TestBed.configureTestingModule({ imports: [NameByPathPipeModule] }).compileComponents();
        pipe = TestBed.inject(NameByPathPipe);
    });

    it('should return entity name', () => {
        expect(pipe.transform('a')).toEqual('a');
        expect(pipe.transform([])).toEqual('');
        expect(pipe.transform(null)).toEqual('');
        expect(pipe.transform({ name: 'a' }, 'name')).toEqual('a');
        expect(pipe.transform({ value: { name: 'a' } }, 'value.name')).toEqual('a');
        expect(function () {
            pipe.transform({ name: 'a' });
        }).toThrow(new Error('attribute "displayKey" can not be empty if input item has "object" type'));
    });
});
