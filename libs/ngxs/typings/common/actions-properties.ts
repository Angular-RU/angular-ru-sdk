import {PlainObjectOf} from '@angular-ru/cdk/typings';
import {ActionOptions, ActionType} from '@ngxs/store';

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
export type ActionEvent = ActionType | (ActionType & {payload: PlainObjectOf<any>});

export type ActionName = string;
export type PayloadName = string;
export type ArgName = string;

export type PayloadMap = Map<PayloadName | number, PayloadName>;
export type ArgNameMap = Map<ArgName | number, ArgName>;
