import {Fn} from '@angular-ru/cdk/typings';
import {isNotNil} from '@angular-ru/cdk/utils';
import {NgxsDataInjector} from '@angular-ru/ngxs/internals';
import {TtLCreatorOptions} from '@angular-ru/ngxs/typings';
import {interval, Subscription} from 'rxjs';

import {ttlHandler} from './ttl-handler';

export function createTtlInterval(options: TtLCreatorOptions): void {
    const {provider, map}: TtLCreatorOptions = options;

    map.get(provider)?.subscription.unsubscribe();

    const watcher: Fn = (): void => {
        const startListen: string = new Date(Date.now()).toISOString();

        const subscription: Subscription = interval(provider.ttlDelay).subscribe(
            (): void => ttlHandler(startListen, options, subscription),
        );

        map.set(provider, {subscription, startListen, endListen: null});
    };

    if (isNotNil(NgxsDataInjector.ngZone)) {
        NgxsDataInjector.ngZone?.runOutsideAngular((): void => watcher());
    } else {
        watcher();
    }
}
