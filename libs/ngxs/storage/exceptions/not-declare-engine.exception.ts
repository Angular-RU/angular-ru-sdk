import {NGXS_DATA_EXCEPTIONS} from '@angular-ru/ngxs/tokens';

export class NotDeclareEngineException extends Error {
    constructor(key: string) {
        super(
            `${NGXS_DATA_EXCEPTIONS.NGXS_PERSISTENCE_ENGINE} \nMetadata { key: '${key}' }`,
        );
    }
}
