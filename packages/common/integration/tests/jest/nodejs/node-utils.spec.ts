import { checkIsNodeEnvironment } from '@angular-ru/common/node.js';

describe('[TEST] Node.js utils', () => {
    it('checkIsNodeEnvironment', () => {
        expect(checkIsNodeEnvironment()).toEqual(true);
    });
});
