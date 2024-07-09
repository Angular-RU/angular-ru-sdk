import {NgModule} from '@angular/core';

import {MODULE_TOKEN} from './injection-tokens';
import {
    FeatureTestComponent,
    FeatureTestService,
    TestComponent,
    TestDirective,
    TestPipe,
    TestService,
} from './test-default';
import {ExtendingTestComponent, TestStairsComponent} from './test-extending';
import {TestTokenComponent} from './test-token';

@NgModule({
    declarations: [
        ExtendingTestComponent,
        FeatureTestComponent,
        TestComponent,
        TestDirective,
        TestPipe,
        TestStairsComponent,
        TestTokenComponent,
    ],
    providers: [
        FeatureTestService,
        TestService,
        {
            provide: MODULE_TOKEN,
            useValue: 'MODULE_TOKEN',
        },
    ],
})
export class TestModule {}
