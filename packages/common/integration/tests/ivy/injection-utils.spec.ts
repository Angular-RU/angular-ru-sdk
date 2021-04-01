import { Component, Injectable } from '@angular/core';
import { directiveInject, inject } from '@angular-ru/common/ivy';
import { TestBed } from '@angular/core/testing';

describe('[TEST]: injection utils', () => {
    describe('directiveInject', () => {
        @Injectable()
        class Service {
            public hello = 'world';
        }

        @Component({
            selector: 'ctx',
            template: '',
            providers: [Service]
        })
        class CtxComponent {
            public service: Service;

            constructor() {
                this.service = directiveInject(Service);
            }
        }

        it('should be correct provide nested service by directiveInject', async () => {
            await TestBed.configureTestingModule({ declarations: [CtxComponent] }).compileComponents();
            const fixture = TestBed.createComponent(CtxComponent);
            expect(fixture.componentInstance.service.hello).toEqual('world');
        });
    });

    describe('inject', () => {
        @Injectable()
        class B {
            public world = 'hello';
        }

        @Injectable()
        class Service {
            public b: B;

            constructor() {
                this.b = inject(B);
            }
        }

        it('should be correct provide nested service by inject', () => {
            TestBed.configureTestingModule({ providers: [Service, B] });
            const service = TestBed.inject(Service);
            expect(service.b.world).toEqual('hello');
        });
    });
});
