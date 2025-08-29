import {makeEnvironmentProviders} from '@angular/core';
import {WebWorkerThreadService} from '@angular-ru/cdk/webworker';

import {providePlainTableComposer} from '../plain-table-composer/plain-table-composer.provider';
import {TableClipboardService} from './table-clipboard.service';

export function provideTableClipboard() {
    return makeEnvironmentProviders([
        providePlainTableComposer(),
        WebWorkerThreadService,
        TableClipboardService,
    ]);
}
