import { Inject, Injectable, Injector, NgZone } from '@angular/core';
import { Store } from '@ngxs/store';
import { ɵNGXS_STATE_CONTEXT_FACTORY, ɵNGXS_STATE_FACTORY } from '@ngxs/store/internals';

import { NgxsDataSequence } from './ngxs-data-computed-stream.service';

@Injectable()
export class NgxsDataInjector {
    public static store: Store | null = null;
    public static computed: NgxsDataSequence | null = null;
    public static context: any | null = null;
    public static factory: any | null = null;
    public static ngZone: NgZone | null = null;
    public static injector: Injector | null = null;

    constructor(
        injector: Injector,
        @Inject(ɵNGXS_STATE_FACTORY) stateFactory: unknown | any,
        @Inject(ɵNGXS_STATE_CONTEXT_FACTORY) stateContextFactory: unknown | any
    ) {
        NgxsDataInjector.store = injector.get<Store>(Store);
        NgxsDataInjector.ngZone = injector.get<NgZone>(NgZone);
        NgxsDataInjector.factory = stateFactory;
        NgxsDataInjector.context = stateContextFactory;
        NgxsDataInjector.computed = injector.get<NgxsDataSequence>(NgxsDataSequence);
        NgxsDataInjector.injector = injector;
    }
}
