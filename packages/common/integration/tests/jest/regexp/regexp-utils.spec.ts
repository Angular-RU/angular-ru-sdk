import { ensureRegexp, isRegexpStr, matchedByRegExp } from '@angular-ru/common/regexp';

describe('[TEST]: Regexp utils', () => {
    it('ensureRegexp', () => {
        expect(ensureRegexp('/hello/')).toEqual('hello');
        expect(ensureRegexp('/hello/')).toEqual('hello');
        expect(ensureRegexp('/^a$/')).toEqual('^a$');
        expect(ensureRegexp('/^a$/')).toEqual('^a$');
    });

    it('isRegexpStr', () => {
        expect(isRegexpStr('/hello/')).toEqual(true);
        expect(isRegexpStr('/hello/')).toEqual(true);
        expect(isRegexpStr('/^a$/')).toEqual(true);
        expect(isRegexpStr('/^a$/')).toEqual(true);
        expect(isRegexpStr('123')).toEqual(false);
    });

    it('matchedByRegexp', () => {
        expect(matchedByRegExp('/hello/', 'hello world')).toEqual(true);
        expect(matchedByRegExp('/1$/', '2020')).toEqual(false);
    });
});
