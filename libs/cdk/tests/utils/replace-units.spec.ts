import {DEFAULT_UNITS_MAP, replaceUnits, UnitsMap} from '@angular-ru/cdk/utils';

describe('[TEST]: replaceUnits', () => {
    describe('default', () => {
        it('should use default units map', () => {
            expect(replaceUnits('1s', DEFAULT_UNITS_MAP)).toBe('1');
            expect(replaceUnits('1m', DEFAULT_UNITS_MAP)).toBe('60');
            expect(replaceUnits('1h', DEFAULT_UNITS_MAP)).toBe('3600');
            expect(replaceUnits('1d', DEFAULT_UNITS_MAP)).toBe('86400');
            expect(replaceUnits('1w', DEFAULT_UNITS_MAP)).toBe('604800');
        });
    });

    describe('custom', () => {
        const UNITS_MAP: UnitsMap = {
            s: 1,
            m: 60,
            h: 3600,
            decimal: 10,
        };

        it('should be able to use different prefixes', () => {
            expect(replaceUnits('1m', UNITS_MAP)).toBe('60');
            expect(replaceUnits('2m', UNITS_MAP)).toBe('120');
            expect(replaceUnits('10m', UNITS_MAP)).toBe('600');
            expect(replaceUnits('1.5m', UNITS_MAP)).toBe('90');
        });

        it('should be able to use different postfixes', () => {
            expect(replaceUnits('1s', UNITS_MAP)).toBe('1');
            expect(replaceUnits('1h', UNITS_MAP)).toBe('3600');
            expect(replaceUnits('1decimal', UNITS_MAP)).toBe('10');
        });

        it('should be able to use mathematic symbols', () => {
            expect(replaceUnits('1m + 1m', UNITS_MAP)).toBe('60 + 60');
            expect(replaceUnits('1m - 1m', UNITS_MAP)).toBe('60 - 60');
            expect(replaceUnits('1m * 1m', UNITS_MAP)).toBe('60 * 60');
            expect(replaceUnits('1m / 1m', UNITS_MAP)).toBe('60 / 60');
        });

        it('should keep spaces', () => {
            expect(replaceUnits('1m', UNITS_MAP)).toBe('60');
            expect(replaceUnits(' 1m ', UNITS_MAP)).toBe(' 60 ');
            expect(replaceUnits('  1m  ', UNITS_MAP)).toBe('  60  ');
            expect(replaceUnits('   1m   1m   1m   ', UNITS_MAP)).toBe('   180   ');
            expect(replaceUnits('   1.5h 2m   ', UNITS_MAP)).toBe('   5520   ');
            expect(
                replaceUnits('   2h   2m   aaa   2m   bbb   5decimal   1h   ', UNITS_MAP),
            ).toBe('   7320   aaa   120   bbb   3650   ');
        });

        it('should keep as it is', () => {
            expect(replaceUnits('', UNITS_MAP)).toBe('');
            expect(replaceUnits('a1m', UNITS_MAP)).toBe('a1m');
            expect(replaceUnits('1ma', UNITS_MAP)).toBe('1ma');
            expect(replaceUnits('1 m', UNITS_MAP)).toBe('1 m');
            expect(replaceUnits('m 1', UNITS_MAP)).toBe('m 1');
            expect(replaceUnits('1mm', UNITS_MAP)).toBe('1mm');
            expect(replaceUnits('1', UNITS_MAP)).toBe('1');
            expect(replaceUnits('m', UNITS_MAP)).toBe('m');
            expect(replaceUnits('1,5m', UNITS_MAP)).toBe('1,5m');
            expect(replaceUnits('a b c 1 2 3', UNITS_MAP)).toBe('a b c 1 2 3');
            expect(replaceUnits('1m', {notExists: 13})).toBe('1m');
        });

        it('should calculate units', () => {
            expect(replaceUnits('1.5h 2m', UNITS_MAP)).toBe('5520');
            expect(replaceUnits('1.5h   2m', UNITS_MAP)).toBe('5520');
            expect(replaceUnits('text 1.5h 2m text', UNITS_MAP)).toBe('text 5520 text');
            expect(replaceUnits('1m 2m text 1h 2h', UNITS_MAP)).toBe('180 text 10800');
        });

        it('should parse expressions in right order', () => {
            expect(replaceUnits('2m aaa 2h 2m', UNITS_MAP)).toBe('120 aaa 7320');
            expect(replaceUnits('2h 2m aaa 2m', UNITS_MAP)).toBe('7320 aaa 120');
        });

        it('should handle empty params', () => {
            expect(replaceUnits('', UNITS_MAP)).toBe('');
            expect(replaceUnits('1m', {})).toBe('1m');
            expect(replaceUnits('', {})).toBe('');
        });

        it('should parse multilines', () => {
            expect(replaceUnits('1m\n2m', UNITS_MAP)).toBe('60\n120');
            expect(replaceUnits('1m\n2m\n3m', UNITS_MAP)).toBe('60\n120\n180');
            expect(replaceUnits('aaa 1m\n2m bbb', UNITS_MAP)).toBe('aaa 60\n120 bbb');
            expect(replaceUnits('   1m   \n   2m   ', UNITS_MAP)).toBe(
                '   60   \n   120   ',
            );
            expect(replaceUnits('1h 1m\n2h 2m', UNITS_MAP)).toBe('3660\n7320');
        });
    });
});
