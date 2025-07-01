/* eslint-disable max-classes-per-file */
import {ApplicationRef, NgZone} from '@angular/core';
import {ChangeDetectionStrategy, Component, Injectable} from '@angular/core';

import {COMPONENT_TOKEN, MODULE_TOKEN, SERVICE_TOKEN} from './injection-tokens';
import {InjectByToken} from './test-decorators';

@Injectable()
export class TestTokenService {
    @InjectByToken(MODULE_TOKEN)
    public moduleToken!: string;

    @InjectByToken(SERVICE_TOKEN)
    public serviceToken!: string;

    @InjectByToken(COMPONENT_TOKEN)
    public componentToken!: string;

    constructor(public ngZone: NgZone) {}
}

@Component({
    standalone: false,
    selector: 'test-token',
    template: '',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        TestTokenService,
        {provide: COMPONENT_TOKEN, useValue: 'COMPONENT_TOKEN'},
        {provide: SERVICE_TOKEN, useValue: 'SERVICE_TOKEN'},
    ],
})
export class TestTokenComponent {
    @InjectByToken(MODULE_TOKEN)
    public moduleToken!: string;

    @InjectByToken(SERVICE_TOKEN)
    public serviceToken!: string;

    @InjectByToken(COMPONENT_TOKEN)
    public componentToken!: string;

    @InjectByToken(TestTokenService)
    public testTokenService!: TestTokenService;

    constructor(public appRef: ApplicationRef) {}
}
