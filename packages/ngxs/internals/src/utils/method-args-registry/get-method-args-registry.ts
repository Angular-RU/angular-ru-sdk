import { Any, Fn } from '@angular-ru/common/typings';
import { NGXS_ARGUMENT_REGISTRY_META } from '@angular-ru/ngxs/tokens';

import { MethodArgsRegistry } from './method-args-registry';

export function getMethodArgsRegistry(method: Fn): MethodArgsRegistry | undefined {
    return (method as Any)[NGXS_ARGUMENT_REGISTRY_META];
}
