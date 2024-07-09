import {Injectable} from '@angular/core';
import {StateRepository} from '@angular-ru/ngxs/decorators';
import {
    NGXS_ARGUMENT_REGISTRY_META,
    NGXS_DATA_META,
    NGXS_META_KEY,
} from '@angular-ru/ngxs/tokens';
import {DataStateClass} from '@angular-ru/ngxs/typings';
import {State} from '@ngxs/store';

describe('[TEST]: NGXS_META', () => {
    it('dataStateClass', () => {
        @StateRepository()
        @State({name: 'app'})
        @Injectable()
        class AppState {}

        expect(NGXS_META_KEY).toBe('NGXS_META');
        expect(NGXS_DATA_META).toBe('NGXS_DATA_META');
        expect(NGXS_ARGUMENT_REGISTRY_META).toBe('NGXS_ARGUMENT_REGISTRY_META');

        expect((AppState as DataStateClass)[NGXS_META_KEY]).toEqual({
            name: 'app',
            actions: {},
            defaults: undefined,
            path: null,
            makeRootSelector: expect.any(Function),
            children: undefined,
        });

        expect((AppState as DataStateClass)[NGXS_DATA_META]).toEqual({
            stateMeta: {
                name: 'app',
                actions: {},
                defaults: undefined,
                path: null,
                makeRootSelector: expect.any(Function),
                children: undefined,
            },
            operations: {},
            stateClass: AppState,
        });
    });
});
