import {isNotNil} from '@angular-ru/cdk/utils';
import {NgxsDataInjector} from '@angular-ru/ngxs/internals';
import {
    NgxsDataAfterExpired,
    NgxsDataExpiredEvent,
    TtLCreatorOptions,
} from '@angular-ru/ngxs/typings';

export function firedStateWhenExpired(key: string, options: TtLCreatorOptions): void {
    const {provider, expiry}: TtLCreatorOptions = options;

    const event: NgxsDataExpiredEvent = {
        key,
        expiry: expiry?.toISOString(),
        timestamp: new Date(Date.now()).toISOString(),
    };

    const instance: NgxsDataAfterExpired | undefined =
        provider.stateInstance as any as NgxsDataAfterExpired;

    instance?.expired$?.next(event);

    // eslint-disable-next-line @typescript-eslint/unbound-method
    if (isNotNil(instance?.ngxsDataAfterExpired)) {
        if (isNotNil(NgxsDataInjector.ngZone)) {
            NgxsDataInjector.ngZone?.run((): void =>
                instance?.ngxsDataAfterExpired?.(event, provider),
            );
        } else {
            instance?.ngxsDataAfterExpired?.(event, provider);
        }
    }
}
