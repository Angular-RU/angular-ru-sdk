import { filter } from '@angular-ru/cdk/string';

describe('[TEST]: Filter', () => {
    describe('no predicate', () => {
        it('should return text as it is if there is no filter params', () => {
            expect(filter('abc ! 13_7')).toEqual('abc ! 13_7');
            expect(filter('a')).toEqual('a');
            expect(filter('')).toEqual('');
        });
    });

    describe('predicate as a list of characters', () => {
        it('should return text as it is if there is no characters', () => {
            expect(filter('abc ! 13_7', [])).toEqual('abc ! 13_7');
        });

        it('should filter text with this characters: a, b, c', () => {
            expect(filter('abc', ['a', 'b', 'c'])).toEqual('abc');
            expect(filter('abc', ['a', 'b'])).toEqual('ab');
            expect(filter('abc', ['c'])).toEqual('c');
        });

        it('should filter text with this characters: a, 4, _, !', () => {
            expect(filter('a4_!OOO', ['a', '4', '_', '!'])).toEqual('a4_!');
        });

        it('should remove spaces', () => {
            expect(filter(' a b  c  ', ['a', 'b', 'c'])).toEqual('abc');
            expect(filter(' a b  c  ', ['a', 'b', 'c', '\\s'])).toEqual('abc');
        });

        it('should keep spaces', () => {
            expect(filter(' a b  c  ', ['a', 'b', 'c', ' '])).toEqual(' a b  c  ');
        });

        it('should use only characters for filtering', () => {
            expect(filter('aaa', ['aaa'])).toEqual('');
            expect(filter('aaa aab abc', ['aa', 'aaa'])).toEqual('');
        });

        it('should remove cyrillic characters', () => {
            // eslint-disable-next-line no-cyrillic-string/no-cyrillic-string
            expect(filter('будет удалено abc', ['a', 'b', 'c'])).toEqual('abc');
        });

        it('should be case sensitive', () => {
            expect(filter('aBc', ['a', 'b', 'c'])).toEqual('ac');
        });
    });

    describe('predicate as a function', () => {
        it('should return text based on predicate function', () => {
            expect(filter('abc', (): boolean => false)).toEqual('');
            expect(filter('abc', (): boolean => true)).toEqual('abc');
        });

        it('should filter text with this characters: a, c', () => {
            expect(filter('aaabbbccc', (item: string): boolean => item === 'a' || item === 'c')).toEqual('aaaccc');
        });

        it('should remove spaces', () => {
            expect(filter('a b c', (item: string): boolean => item === 'a' || item === 'b' || item === 'c')).toEqual(
                'abc'
            );
        });

        it('should not remove spaces', () => {
            expect(
                filter('a b c', (item: string): boolean => item === 'a' || item === 'b' || item === 'c' || item === ' ')
            ).toEqual('a b c');
        });
    });

    describe('predicate as a RegExp', () => {
        it('should use RegExp for filtering text', () => {
            expect(filter('aaabbbccc', /a/)).toEqual('a');
            expect(filter('aaabbbccc', /a/g)).toEqual('aaa');
            expect(filter('aaabbbccc', /[a,b]+/)).toEqual('aaabbb');
        });
    });
});
