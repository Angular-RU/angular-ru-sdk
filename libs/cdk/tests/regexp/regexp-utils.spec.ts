import {ensureRegexp, isRegexpStr, matchedByRegExp} from '@angular-ru/cdk/regexp';

describe('[TEST]: Regexp utils', () => {
    it('ensureRegexp', () => {
        expect(ensureRegexp('/hello/')).toBe('hello');
        expect(ensureRegexp('/hello/')).toBe('hello');
        expect(ensureRegexp('/^a$/')).toBe('^a$');
        expect(ensureRegexp('/^a$/')).toBe('^a$');
    });

    it('isRegexpStr', () => {
        expect(isRegexpStr('/hello/')).toBe(true);
        expect(isRegexpStr('/hello/')).toBe(true);
        expect(isRegexpStr('/^a$/')).toBe(true);
        expect(isRegexpStr('/^a$/')).toBe(true);
        expect(isRegexpStr('123')).toBe(false);
    });

    it('matchedByRegexp', () => {
        expect(matchedByRegExp('/hello/', 'hello world')).toBe(true);
        expect(matchedByRegExp('/1$/', '2020')).toBe(false);
    });
});
