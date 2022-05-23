import { PlainObjectOf } from '@angular-ru/cdk/typings';
import { ActionOptions, ActionType } from '@ngxs/store';

/**
 * @publicApi
 */
export interface RepositoryActionOptions extends ActionOptions {
    insideZone?: boolean;
    subscribeRequired?: boolean;
}

/**
 * @publicApi
 */
export type ActionEvent = (ActionType & { payload: PlainObjectOf<any> }) | ActionType;

export type ActionName = string;
export type PayloadName = string;
export type ArgName = string;

export type PayloadMap = Map<number | PayloadName, PayloadName>;
export type ArgNameMap = Map<number | ArgName, ArgName>;
