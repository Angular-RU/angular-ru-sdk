/* eslint-disable @typescript-eslint/unified-signatures */
import { ClassType } from '@angular-ru/common/typings';
import { DataUrlPathSegment } from '@angular-ru/http/typings';

type Decorator = (clientClass: ClassType) => void;

export function RestClient(): Decorator;
export function RestClient(baseUrl: string): Decorator;
export function RestClient(options: Partial<DataUrlPathSegment>): Decorator;
export function RestClient(optionsOrBaseUrl?: Partial<DataUrlPathSegment> | string): Decorator {
    return (clientClass: ClassType): void => {
        const segments: Partial<DataUrlPathSegment> =
            typeof optionsOrBaseUrl === 'string' ? { baseUrl: optionsOrBaseUrl } : optionsOrBaseUrl ?? {};

        Object.defineProperties(clientClass.prototype, {
            local: {
                writable: true,
                enumerable: true,
                configurable: true,
                value: { ...segments }
            }
        });
    };
}
