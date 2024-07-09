import {Nullable} from '@angular-ru/cdk/typings';

export function getCountSpacesOnString(value?: Nullable<string>): number {
    return value?.match(/\s/g)?.length ?? 0;
}
