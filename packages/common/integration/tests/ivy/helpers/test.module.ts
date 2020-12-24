import { ApplicationRef, NgModule, NgZone } from '@angular/core';
import { useInjector } from '@angular-ru/common/ivy';

import {
    FeatureTestComponent,
    FeatureTestService,
    TestComponent,
    TestDirective,
    TestPipe,
    TestService
} from './test-default';
import { ExtendingTestComponent, TestStairsC } from './test-extending';

@NgModule({
    declarations: [TestDirective, TestComponent, FeatureTestComponent, ExtendingTestComponent, TestPipe, TestStairsC],
    providers: [TestService, FeatureTestService]
})
export class TestModule {
    @W
    public ngZone!: NgZone;
}

function W(c, k) {
    useInjector(c, (inj, i) => (i[k] = inj.get(ApplicationRef)));
}
