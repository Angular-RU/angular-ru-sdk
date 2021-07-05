import {
    REG_EXP_NO_CYRILLIC,
    REG_EXP_STRICT_NAME,
    REG_EXP_INTEGERS_SEPARATED_BY_COMMA
} from '@angular-ru/common/regexp';

describe('[TEST]: Regexp constants', () => {
    it('should parse string with REG_EXP_STRICT_NAME', () => {
        expect(REG_EXP_STRICT_NAME.test('aaaBBB')).toEqual(true);
        expect(REG_EXP_STRICT_NAME.test('_aaa_bbb_')).toEqual(true);
        expect(REG_EXP_STRICT_NAME.test('aaabbb777')).toEqual(true);
        expect(REG_EXP_STRICT_NAME.test('777aaaBBB')).toEqual(false);
        expect(REG_EXP_STRICT_NAME.test('aaa BBB')).toEqual(false);
        expect(REG_EXP_STRICT_NAME.test('aaaBBB!')).toEqual(false);
        expect(REG_EXP_STRICT_NAME.test('aaaДДД')).toEqual(false);
    });

    it('should parse string with REG_EXP_NO_CYRILLIC', () => {
        expect(parse('aaa BBB @ ! 7', REG_EXP_NO_CYRILLIC)).toEqual('aaa BBB @ ! 7');
        expect(parse('aaa ДДД', REG_EXP_NO_CYRILLIC)).toEqual('aaa ');
    });

    it('should parse string with REG_EXP_NUMBERS_SEPARATED_BY_COMMA', () => {
        expect(parse('12,13,77', REG_EXP_INTEGERS_SEPARATED_BY_COMMA)).toEqual('12,13,77');
        expect(parse(' 12 13, 77 ', REG_EXP_INTEGERS_SEPARATED_BY_COMMA)).toEqual('1213,77');
        expect(parse('aaa,12,bbb', REG_EXP_INTEGERS_SEPARATED_BY_COMMA)).toEqual('12,');
    });
});

function parse(value: string, regexp: RegExp): string {
    return (value.match(regexp) ?? []).join('');
}
