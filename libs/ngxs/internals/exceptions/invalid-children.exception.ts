import {isNotNil} from '@angular-ru/cdk/utils';
import {NGXS_DATA_EXCEPTIONS} from '@angular-ru/ngxs/tokens';

export class InvalidChildrenException extends Error {
    constructor(currentDefaults: any | unknown) {
        super(
            `${NGXS_DATA_EXCEPTIONS.NGXS_DATA_CHILDREN_CONVERT}. Cannot convert ${
                isNotNil(currentDefaults?.constructor)
                    ? currentDefaults.constructor.name
                    : currentDefaults
            } to PlainObject`,
        );
    }
}
