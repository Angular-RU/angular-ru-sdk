import { Component } from '@angular/core';

import { InjectTestService } from './inject-test-service.decorator';
import { TestService } from './test.service';

@Component({
    selector: 'test-component',
    template: ''
})
export class TestComponent {
    @InjectTestService()
    public testService!: TestService;
}
