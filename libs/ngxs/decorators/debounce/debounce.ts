import {isDevMode} from '@angular/core';
import {Descriptor} from '@angular-ru/cdk/typings';
import {isNotNil} from '@angular-ru/cdk/utils';
import {checkExistNgZone, NgxsDataInjector} from '@angular-ru/ngxs/internals';
import {NGXS_DATA_EXCEPTIONS} from '@angular-ru/ngxs/tokens';

const DEFAULT_TIMEOUT: number = 300;

export function Debounce(timeout: number = DEFAULT_TIMEOUT): MethodDecorator {
    let timeoutRef: number | null = null;

    return <T>(
        _target: T,
        _name: string | symbol,
        descriptor: Descriptor,
    ): Descriptor => {
        const originalMethod: any = descriptor.value;

        descriptor.value = function (...args: any[]): any {
            checkExistNgZone();

            NgxsDataInjector.ngZone?.runOutsideAngular((): void => {
                window.clearTimeout(timeoutRef!);
                // eslint-disable-next-line no-restricted-properties
                timeoutRef = window.setTimeout((): void => {
                    const result: any = originalMethod.apply(this, args);

                    if (isDevMode() && isNotNil(result)) {
                        console.warn(
                            NGXS_DATA_EXCEPTIONS.NGXS_DATA_ASYNC_ACTION_RETURN_TYPE,
                            result,
                        );
                    }
                }, timeout);
            });
        };

        return descriptor;
    };
}
