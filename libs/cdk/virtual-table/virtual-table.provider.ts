import {makeEnvironmentProviders} from '@angular/core';
import {WebWorkerThreadService} from '@angular-ru/cdk/webworker';

export function provideVirtualTable() {
    return makeEnvironmentProviders([WebWorkerThreadService]);
}
