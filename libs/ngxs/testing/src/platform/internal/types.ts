import { Any } from '@angular-ru/cdk/typings';

export type TestSpec = (...args: Any[]) => Promise<void>;
