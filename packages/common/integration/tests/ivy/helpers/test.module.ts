import { NgModule } from '@angular/core';

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
export class TestModule {}
