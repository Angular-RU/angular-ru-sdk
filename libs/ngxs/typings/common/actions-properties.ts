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

export type PayloadMap = Map<number | string, string>;
export type ArgNameMap = Map<number | string, string>;
