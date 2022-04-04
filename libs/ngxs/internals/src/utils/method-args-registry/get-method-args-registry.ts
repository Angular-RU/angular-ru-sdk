import { Fn } from '@angular-ru/cdk/typings';
import { NGXS_ARGUMENT_REGISTRY_META } from '@angular-ru/ngxs/tokens';

import { MethodArgsRegistry } from './method-args-registry';

export function getMethodArgsRegistry(method: Fn): MethodArgsRegistry | undefined {
    return (method as any)[NGXS_ARGUMENT_REGISTRY_META];
}
