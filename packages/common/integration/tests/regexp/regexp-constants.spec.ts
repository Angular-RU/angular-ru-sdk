import { REG_EXP_NO_CYRILLIC, REG_EXP_STRICT_NAME } from '@angular-ru/common/regexp';

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
});

function parse(value: string, regexp: RegExp): string {
    return (value.match(regexp) ?? []).join('');
}
