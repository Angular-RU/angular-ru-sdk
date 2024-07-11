import {InjectionToken} from '@angular/core';

import {WebsocketConfig} from '../services/websocket-config';

export const WEBSOCKET_CONFIGS = new InjectionToken<Partial<WebsocketConfig>>(
    'WEBSOCKET_CONFIGS',
);
