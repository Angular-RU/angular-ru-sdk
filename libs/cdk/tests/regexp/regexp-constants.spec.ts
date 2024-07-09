import {
    REG_EXP_DIGITS,
    REG_EXP_DIGITS_SEPARATED_BY_COMMA,
    REG_EXP_NO_CYRILLIC,
    REG_EXP_NUMBER,
    REG_EXP_STRICT_NAME,
} from '@angular-ru/cdk/regexp';

describe('[TEST]: Regexp constants', () => {
    it('should parse string with REG_EXP_STRICT_NAME', () => {
        expect(REG_EXP_STRICT_NAME.test('aaaBBB')).toBe(true);
        expect(REG_EXP_STRICT_NAME.test('_aaa_bbb_')).toBe(true);
        expect(REG_EXP_STRICT_NAME.test('aaabbb777')).toBe(true);
        expect(REG_EXP_STRICT_NAME.test('777aaaBBB')).toBe(false);
        expect(REG_EXP_STRICT_NAME.test('aaa BBB')).toBe(false);
        expect(REG_EXP_STRICT_NAME.test('aaaBBB!')).toBe(false);
        // eslint-disable-next-line no-cyrillic-string/no-cyrillic-string
        expect(REG_EXP_STRICT_NAME.test('aaaДДД')).toBe(false);
    });

    it('should parse string with REG_EXP_NUMBER', () => {
        expect(REG_EXP_NUMBER.test('123')).toBe(true);
        expect(REG_EXP_NUMBER.test('123.456')).toBe(true);
        expect(REG_EXP_NUMBER.test('123abc')).toBe(false);
        expect(REG_EXP_NUMBER.test('abc')).toBe(false);
        expect(REG_EXP_NUMBER.test('')).toBe(false);
    });

    it('should parse string with REG_EXP_NO_CYRILLIC', () => {
        expect(parse('aaa BBB @ ! 7', REG_EXP_NO_CYRILLIC)).toBe('aaa BBB @ ! 7');
        // eslint-disable-next-line no-cyrillic-string/no-cyrillic-string
        expect(parse('aaa ДДД', REG_EXP_NO_CYRILLIC)).toBe('aaa ');
    });

    it('should parse string with REG_EXP_DIGITS_SEPARATED_BY_COMMA', () => {
        expect(parse('12,13,77', REG_EXP_DIGITS_SEPARATED_BY_COMMA)).toBe('12,13,77');
        expect(parse(' 12 13, 77 ', REG_EXP_DIGITS_SEPARATED_BY_COMMA)).toBe('1213,77');
        expect(parse('aaa,12,bbb', REG_EXP_DIGITS_SEPARATED_BY_COMMA)).toBe('12,');
    });

    it('should parse string with REG_EXP_DIGITS', () => {
        expect(parse('123', REG_EXP_DIGITS)).toBe('123');
        expect(parse('123abc', REG_EXP_DIGITS)).toBe('123');
        expect(parse('abc123abc', REG_EXP_DIGITS)).toBe('123');
        expect(parse(' 1 2 3 ', REG_EXP_DIGITS)).toBe('123');
        expect(parse('123,4', REG_EXP_DIGITS)).toBe('1234');
        expect(parse('abc 123 abc 4,5', REG_EXP_DIGITS)).toBe('12345');
    });
});

function parse(value: string, regexp: RegExp): string {
    return (value.match(regexp) ?? []).join('');
}
