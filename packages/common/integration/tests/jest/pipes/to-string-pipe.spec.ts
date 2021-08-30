import { ToStringPipe, ToStringPipeModule } from '@angular-ru/common/pipes';
import { TestBed } from '@angular/core/testing';

describe('to string pipe', () => {
    let pipe: ToStringPipe;

    beforeEach(() => {
        TestBed.configureTestingModule({ imports: [ToStringPipeModule] }).compileComponents();
        pipe = TestBed.inject(ToStringPipe);
    });

    it('to string', () => {
        expect(pipe.transform(1)).toEqual('1');
        expect(pipe.transform(null)).toEqual('');
        expect(pipe.transform('1')).toEqual('1');
        expect(pipe.transform('  ')).toEqual('  ');
        expect(pipe.transform([])).toEqual('');
        expect(pipe.transform([1, 2])).toEqual('1,2');
        expect(pipe.transform({ a: 1, b: 2 })).toEqual('[object Object]');
        expect(pipe.transform({ a: 1, b: 2 }, (obj: { a: number; b: number }) => JSON.stringify(obj))).toEqual(
            '{"a":1,"b":2}'
        );
    });
});
