import { MethodArgsRegistry } from '@angular-ru/common/runtime';
import { Any, Fn, Nullable } from '@angular-ru/common/typings';

export function getMethodArgsRegistry(method: Fn, metaKey: string): Nullable<MethodArgsRegistry> {
    return (method as Any)?.[metaKey] ?? null;
}
