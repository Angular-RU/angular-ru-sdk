import {makeEnvironmentProviders} from '@angular/core';

import {WebsocketConfig} from './services/websocket-config';
import {WEBSOCKET_CONFIGS} from './tokens/websocket-configs';

export function provideWebsocket(config: Partial<WebsocketConfig> = {}) {
    return makeEnvironmentProviders([
        {
            provide: WEBSOCKET_CONFIGS,
            useValue: config,
        },
        {
            provide: WebsocketConfig,
            useFactory: configFactory,
            deps: [WEBSOCKET_CONFIGS],
        },
    ]);
}

function configFactory(options: Partial<WebsocketConfig>): WebsocketConfig {
    return {...new WebsocketConfig(), ...options};
}
