import {Injectable} from '@angular/core';
import {TestBed} from '@angular/core/testing';
import {BoundClass} from '@angular-ru/cdk/decorators';

describe('@BoundClass', () => {
    it('auto bind methods', () => {
        @Injectable()
        class B {
            public b: string = '2';
        }

        @BoundClass
        @Injectable()
        class A {
            public a: string = '1';

            constructor(public readonly b: B) {}

            public getA() {
                return this;
            }
        }

        TestBed.configureTestingModule({providers: [A, B]});

        const a = TestBed.inject(A);

        // eslint-disable-next-line @typescript-eslint/unbound-method
        const {getA} = a;

        expect(a).toEqual({a: '1', b: {b: '2'}});
        expect(getA()).toEqual({a: '1', b: {b: '2'}});
        expect(getA() === a).toBeTruthy();
    });
});
