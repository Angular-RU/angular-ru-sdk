import { Any } from './any';

/**
 * @deprecated - use native MethodDecorator from ES2015+
 */
export type DecoratorMethod = (target: Any, key: string, descriptor: PropertyDescriptor) => PropertyDescriptor;
