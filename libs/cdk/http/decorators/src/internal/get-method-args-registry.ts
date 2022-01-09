import { MethodArgsRegistry } from '@angular-ru/cdk/runtime';
import { Any, Fn, Nullable } from '@angular-ru/cdk/typings';

export function getMethodArgsRegistry(method: Fn, metaKey: string): Nullable<MethodArgsRegistry> {
    return (method as Any)?.[metaKey] ?? null;
}
