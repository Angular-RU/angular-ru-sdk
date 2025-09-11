import {filter} from '@angular-ru/cdk/string';

describe('[TEST]: Filter', () => {
    describe('no predicate', () => {
        it('should return text as it is if there is no filter params', () => {
            expect(filter('abc ! 13_7')).toBe('abc ! 13_7');
            expect(filter('a')).toBe('a');
            expect(filter('')).toBe('');
        });
    });

    describe('predicate as a list of characters', () => {
        it('should return text as it is if there is no characters', () => {
            expect(filter('abc ! 13_7', [])).toBe('abc ! 13_7');
        });

        it('should filter text with this characters: a, b, c', () => {
            expect(filter('abc', ['a', 'b', 'c'])).toBe('abc');
            expect(filter('abc', ['a', 'b'])).toBe('ab');
            expect(filter('abc', ['c'])).toBe('c');
        });

        it('should filter text with this characters: a, 4, _, !', () => {
            expect(filter('a4_!OOO', ['a', '4', '_', '!'])).toBe('a4_!');
        });

        it('should remove spaces', () => {
            expect(filter(' a b  c  ', ['a', 'b', 'c'])).toBe('abc');
            expect(filter(' a b  c  ', ['a', 'b', 'c', String.raw`\s`])).toBe('abc');
        });

        it('should keep spaces', () => {
            expect(filter(' a b  c  ', ['a', 'b', 'c', ' '])).toBe(' a b  c  ');
        });

        it('should use only characters for filtering', () => {
            expect(filter('aaa', ['aaa'])).toBe('');
            expect(filter('aaa aab abc', ['aa', 'aaa'])).toBe('');
        });

        it('should remove cyrillic characters', () => {
            expect(filter('будет удалено abc', ['a', 'b', 'c'])).toBe('abc');
        });

        it('should be case sensitive', () => {
            expect(filter('aBc', ['a', 'b', 'c'])).toBe('ac');
        });
    });

    describe('predicate as a function', () => {
        it('should return text based on predicate function', () => {
            expect(filter('abc', (): boolean => false)).toBe('');
            expect(filter('abc', (): boolean => true)).toBe('abc');
        });

        it('should filter text with this characters: a, c', () => {
            expect(
                filter(
                    'aaabbbccc',
                    (item: string): boolean => item === 'a' || item === 'c',
                ),
            ).toBe('aaaccc');
        });

        it('should remove spaces', () => {
            expect(
                filter(
                    'a b c',
                    (item: string): boolean =>
                        item === 'a' || item === 'b' || item === 'c',
                ),
            ).toBe('abc');
        });

        it('should not remove spaces', () => {
            expect(
                filter(
                    'a b c',
                    (item: string): boolean =>
                        item === 'a' || item === 'b' || item === 'c' || item === ' ',
                ),
            ).toBe('a b c');
        });
    });

    describe('predicate as a RegExp', () => {
        it('should use RegExp for filtering text', () => {
            expect(filter('aaabbbccc', /a/)).toBe('a');
            expect(filter('aaabbbccc', /a/g)).toBe('aaa');
            expect(filter('aaabbbccc', /[,ab]+/)).toBe('aaabbb');
        });
    });
});
