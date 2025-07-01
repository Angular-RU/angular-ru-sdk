import {ChangeDetectionStrategy, Component, Injectable} from '@angular/core';
import {TestBed} from '@angular/core/testing';
import {directiveInject, inject} from '@angular-ru/cdk/ivy';
import {Nullable} from '@angular-ru/cdk/typings';

describe('[TEST]: injection utils', () => {
    describe('directiveInject', () => {
        @Injectable()
        class Service {
            public hello = 'world';
        }

        @Component({
            standalone: false,
            selector: 'ctx',
            template: '',
            changeDetection: ChangeDetectionStrategy.OnPush,
            providers: [Service],
        })
        class CtxComponent {
            public service: Service;

            constructor() {
                this.service = directiveInject(Service);
            }
        }

        it('should be correct provide nested service by directiveInject', async () => {
            await TestBed.configureTestingModule({
                declarations: [CtxComponent],
            }).compileComponents();
            const fixture = TestBed.createComponent(CtxComponent);

            expect(fixture.componentInstance.service.hello).toBe('world');
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
            TestBed.configureTestingModule({providers: [Service, B]});
            const service = TestBed.inject(Service);

            expect(service.b.world).toBe('hello');
        });
    });

    describe('non injection context', () => {
        it('inject B', () => {
            @Injectable()
            class B {
                public world = 'hello';
            }

            @Injectable()
            class Service {
                public b: Nullable<B> = null;

                constructor() {
                    this.b = inject(B, {optional: true});
                }
            }

            const service = new Service();

            expect(service).toEqual({b: null});
        });

        it('directiveInject Service', () => {
            @Injectable()
            class Service {
                public hello = 'world';
            }

            @Component({
                standalone: false,
                selector: 'ctx',
                template: '',
                changeDetection: ChangeDetectionStrategy.OnPush,
                providers: [Service],
            })
            class CtxComponent {
                public service: Nullable<Service>;

                constructor() {
                    this.service = directiveInject(Service, {optional: true});
                }
            }

            const service = new CtxComponent();

            expect(service).toEqual({service: null});
        });
    });
});
