import { isGetter } from '@angular-ru/cdk/object';
import { Any } from '@angular-ru/cdk/typings';
import { NGXS_DATA_EXCEPTIONS } from '@angular-ru/ngxs/tokens';

export function validateComputedMethod(target: Any, name: string | symbol): void {
    const notGetter: boolean = !isGetter(target, name?.toString());
    if (notGetter) {
        throw new Error(
            NGXS_DATA_EXCEPTIONS.NGXS_COMPUTED_DECORATOR +
                `\nExample: \n@Computed() get ${name.toString()}() { \n\t .. \n}`
        );
    }
}
