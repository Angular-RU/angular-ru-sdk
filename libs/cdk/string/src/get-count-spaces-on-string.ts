import { Nullable } from '@angular-ru/cdk/typings';

export function getCountSpacesOnString(val?: Nullable<string>): number {
    return val?.match(/\s/g)?.length ?? 0;
}
