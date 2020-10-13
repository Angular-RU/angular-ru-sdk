import { InjectionToken } from '@angular/core';

import { WebsocketConfig } from './websocket.config';

export const WEBSOCKET_CONFIGS: InjectionToken<Partial<WebsocketConfig>> = new InjectionToken('WEBSOCKET_CONFIGS');
