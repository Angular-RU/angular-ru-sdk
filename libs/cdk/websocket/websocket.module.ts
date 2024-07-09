import {ModuleWithProviders, NgModule} from '@angular/core';

import {WebsocketConfig} from './services/websocket-config';
import {WEBSOCKET_CONFIGS} from './tokens/websocket-configs';

@NgModule()
export class WebsocketModule {
    public static forRoot(
        config: Partial<WebsocketConfig> = {},
    ): ModuleWithProviders<WebsocketModule> {
        return {
            ngModule: WebsocketModule,
            providers: [
                {
                    provide: WEBSOCKET_CONFIGS,
                    useValue: config,
                },
                {
                    provide: WebsocketConfig,
                    useFactory: WebsocketModule.configFactory,
                    deps: [WEBSOCKET_CONFIGS],
                },
            ],
        };
    }

    private static configFactory(options: Partial<WebsocketConfig>): WebsocketConfig {
        return {...new WebsocketConfig(), ...options};
    }
}
