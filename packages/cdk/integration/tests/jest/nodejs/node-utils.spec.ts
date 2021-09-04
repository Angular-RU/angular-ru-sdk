import { checkIsNodeEnvironment } from '@angular-ru/cdk/node.js';

describe('[TEST] Node.js utils', () => {
    it('checkIsNodeEnvironment', () => {
        expect(checkIsNodeEnvironment()).toEqual(true);
    });
});
