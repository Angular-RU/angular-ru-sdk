import {Injectable, NgZone} from '@angular/core';
import {DataAction, StateRepository} from '@angular-ru/ngxs/decorators';
import {NgxsDataRepository} from '@angular-ru/ngxs/repositories';
import {ngxsTestingPlatform} from '@angular-ru/ngxs/testing';
import {State} from '@ngxs/store';

describe('[TEST]: Zone', () => {
    @StateRepository()
    @State({
        name: 'counter',
        defaults: 0,
    })
    @Injectable()
    class CounterState extends NgxsDataRepository<number> {
        public inside = 0;
        public outside = 0;

        @DataAction()
        public increment(): number {
            return this._increment();
        }

        @DataAction({insideZone: true})
        public incrementInZone(): number {
            return this._increment();
        }

        public incrementWithoutAction(): number {
            return this._increment();
        }

        private _increment(): number {
            if (NgZone.isInAngularZone()) {
                this.inside += 1;
            } else {
                this.outside += 1;
            }

            const newState: number = this.getState() + 1;

            this.ctx.setState(newState);

            return newState;
        }
    }

    it(
        'should be works inside/outside zone',
        ngxsTestingPlatform([CounterState], (_store, state) => {
            expect(state.increment()).toBe(1);

            expect(state.outside).toBe(1);
            expect(state.inside).toBe(0);
            expect(state.getState()).toBe(1);

            expect(state.incrementWithoutAction()).toBe(2);

            expect(state.outside).toBe(2);
            expect(state.inside).toBe(0);
            expect(state.getState()).toBe(2);

            expect(state.incrementInZone()).toBe(3);

            expect(state.outside).toBe(2);
            expect(state.inside).toBe(1);
            expect(state.getState()).toBe(3);
        }),
    );
});
