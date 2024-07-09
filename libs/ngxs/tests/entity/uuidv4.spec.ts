import {generateUid} from '@angular-ru/cdk/utils';

describe('[TEST]: Entity uuidv4', () => {
    it('should be correct generate uui', () => {
        expect(generateUid()).toEqual(expect.any(String));
        expect(generateUid()).not.toEqual(generateUid());
        expect(generateUid()).toHaveLength(36);
        expect(generateUid().split('-')).toEqual([
            expect.any(String),
            expect.any(String),
            expect.any(String),
            expect.any(String),
            expect.any(String),
        ]);
    });
});
