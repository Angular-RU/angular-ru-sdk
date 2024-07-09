import {Type} from '@angular/core';
import {PlainObjectOf} from '@angular-ru/cdk/typings';

export function dynamicActionByType(type: string): Type<any> {
    return class NgxsDataAction {
        constructor(payload: PlainObjectOf<any> | null) {
            if (payload) {
                for (const key of Object.keys(payload)) {
                    (this as any)[key] = payload[key];
                }
            }
        }

        public static get type(): string {
            return type;
        }
    };
}
