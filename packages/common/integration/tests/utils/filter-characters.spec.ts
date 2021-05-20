import { filterCharacters } from '@angular-ru/common/utils';

describe('[TEST]: Filter Characters', () => {
    it('should return text as it is if there is no filter characters', () => {
        expect(filterCharacters('abc ! 13_7')).toEqual('abc ! 13_7');
        expect(filterCharacters('abc ! 13_7', [])).toEqual('abc ! 13_7');
        expect(filterCharacters('a')).toEqual('a');
        expect(filterCharacters('')).toEqual('');
    });

    it('should filter text with this characters: a, b, c', () => {
        expect(filterCharacters('abc', ['a', 'b', 'c'])).toEqual('abc');
        expect(filterCharacters('a  b c', ['a', 'b', 'c'])).toEqual('abc');
        expect(filterCharacters('a  b,c 13 !', ['a', 'b', 'c'])).toEqual('abc');
        expect(filterCharacters('a', ['a', 'b', 'c'])).toEqual('a');
    });

    it('should filter text with this characters: a, b, 4, "\\s", "_", !', () => {
        expect(filterCharacters('a-bc 4_7!', ['a', 'b', '4', '\\s', '_', '!'])).toEqual('ab 4_!');
    });

    it('should remove spaces', () => {
        expect(filterCharacters(' a b  c  ', ['a', 'b', 'c'])).toEqual('abc');
    });

    it('should not remove spaces', () => {
        expect(filterCharacters(' a b  c   ', ['a', 'b', 'c', '\\s'])).toEqual(' a b  c   ');
    });

    it('should use only characters for filtering', () => {
        expect(filterCharacters('aaa aab abc', ['aa', 'aaa'])).toEqual('');
    });

    it('should remove cyrillic characters', () => {
        expect(filterCharacters('будет удалено abc', ['a', 'b', 'c', '\\s'])).toEqual('  abc');
        expect(filterCharacters('ЛюбоеName', ['N', 'a', 'm', 'e'])).toEqual('Name');
    });

    it('should be case sensitive', () => {
        expect(filterCharacters('aBc', ['a', 'b', 'c'])).toEqual('ac');
    });

    it('should be case sensitive', () => {
        expect(filterCharacters('ab c Д', ['a', 'b', 'c'])).toEqual('abc');
    });
});
