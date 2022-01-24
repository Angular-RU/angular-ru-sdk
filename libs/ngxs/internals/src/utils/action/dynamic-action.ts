import { Type } from '@angular/core';
import { Any, PlainObjectOf } from '@angular-ru/cdk/typings';

export function dynamicActionByType(type: string): Type<Any> {
    return class NgxsDataAction {
        constructor(payload: PlainObjectOf<Any> | null) {
            if (payload) {
                for (const key of Object.keys(payload)) {
                    (this as Any)[key] = payload[key];
                }
            }
        }

        public static get type(): string {
            return type;
        }
    };
}
