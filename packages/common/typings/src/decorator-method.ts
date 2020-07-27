import { Any } from './any';

export type DecoratorMethod = (target: Any, key: string, descriptor: PropertyDescriptor) => PropertyDescriptor;
