import {makeEnvironmentProviders} from '@angular/core';

import {PlainTableComposerService} from './plain-table-composer.service';

export function providePlainTableComposer() {
    return makeEnvironmentProviders([PlainTableComposerService]);
}
