import { TestBed } from '@angular/core/testing';
import { HttpReplacerPipe, HttpReplacerPipeModule } from '@angular-ru/cdk/pipes';

describe('http replacer pipe', () => {
    let pipe: HttpReplacerPipe;

    beforeEach(() => {
        TestBed.configureTestingModule({ imports: [HttpReplacerPipeModule] }).compileComponents();
        pipe = TestBed.inject(HttpReplacerPipe);
    });

    it('http replacer', () => {
        expect(pipe.transform('http://hello.com')).toEqual('hello.com');
        expect(pipe.transform('https://hello.com/index.php')).toEqual('hello.com');
        expect(pipe.transform('https://www.hello.com/new/index.php')).toEqual('hello.com/new');
    });
});
