import { NgModule } from '@angular/core';

import { MODULE_TOKEN } from './injection-tokens';
import {
    FeatureTestComponent,
    FeatureTestService,
    TestComponent,
    TestDirective,
    TestPipe,
    TestService
} from './test-default';
import { ExtendingTestComponent, TestStairsComponent } from './test-extending';
import { TestTokenComponent } from './test-token';

@NgModule({
    declarations: [
        TestDirective,
        TestComponent,
        FeatureTestComponent,
        ExtendingTestComponent,
        TestPipe,
        TestStairsComponent,
        TestTokenComponent
    ],
    providers: [
        TestService,
        FeatureTestService,
        {
            provide: MODULE_TOKEN,
            useValue: 'MODULE_TOKEN'
        }
    ]
})
export class TestModule {}
