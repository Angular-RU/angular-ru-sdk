import { Injectable } from '@angular/core';
import { fakeAsync, TestBed, tick } from '@angular/core/testing';

import { NgxsDataPluginModule } from '@angular-ru/ngxs';
import { DataAction, Payload, StateRepository } from '@angular-ru/ngxs/decorators';
import { NgxsDataRepository } from '@angular-ru/ngxs/repositories';
import { Actions, NgxsModule, State } from '@ngxs/store';
import { take } from 'rxjs/operators';

describe('[TEST]: Deep data action type', () => {
    afterEach(() => {
        TestBed.resetTestingModule();
    });

    it('should use deeply nested @DataAction() names', fakeAsync(() => {
        @StateRepository()
        @State({ name: 'c', defaults: { prop: undefined } })
        @Injectable()
        class C extends NgxsDataRepository<{ prop: string }> {
            @DataAction()
            public setProp(@Payload('prop') prop: string) {
                this.ctx.setState({ prop });
            }
        }

        @StateRepository()
        @State({ name: 'b', defaults: { prop: undefined }, children: [C] })
        @Injectable()
        class B extends NgxsDataRepository<{ prop: string }> {
            @DataAction()
            public setProp(@Payload('prop') prop: string) {
                this.ctx.setState({ prop });
            }
        }

        @StateRepository()
        @State({ name: 'a', defaults: { prop: undefined }, children: [B] })
        @Injectable()
        class A extends NgxsDataRepository<{ prop: string }> {
            @DataAction()
            public setProp(@Payload('prop') prop: string) {
                this.ctx.setState({ prop });
            }
        }

        TestBed.configureTestingModule({
            imports: [NgxsModule.forRoot([A, B, C], { developmentMode: true }), NgxsDataPluginModule.forRoot()]
        });

        const stateA: A = TestBed.inject(A);

        expect(stateA.getState()).toEqual({
            prop: undefined,
            b: {
                prop: undefined,
                c: { prop: undefined }
            }
        });

        const stateB: B = TestBed.inject(B);

        expect(stateB.getState()).toEqual({
            prop: undefined,
            c: { prop: undefined }
        });

        const stateC: C = TestBed.inject(C);

        expect(stateC.getState()).toEqual({
            prop: undefined
        });

        const actions: any[] = [];
        const actions$: Actions = TestBed.inject(Actions);

        actions$.pipe(take(6)).subscribe((action) => actions.push(action));

        stateA.setProp('A');
        stateB.setProp('B');
        stateC.setProp('C');

        tick(100);

        expect(actions[0].action.constructor.type).toBe('@a.setProp(prop)');
        expect(actions[2].action.constructor.type).toBe('@a/b.setProp(prop)');
        expect(actions[4].action.constructor.type).toBe('@a/b/c.setProp(prop)');

        expect(stateA.snapshot).toEqual({
            prop: 'A',
            b: {
                prop: 'B',
                c: { prop: 'C' }
            }
        });
    }));
});
