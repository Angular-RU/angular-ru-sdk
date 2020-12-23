import { NgModule } from '@angular/core';

import { TestComponent } from './test.component';
import { TestService } from './test.service';

@NgModule({
    declarations: [TestComponent],
    providers: [TestService]
})
export class TestModule {}
