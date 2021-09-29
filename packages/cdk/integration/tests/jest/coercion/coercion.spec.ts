import { coerceBoolean } from '@angular-ru/cdk/coercion';
import { Any } from '@angular-ru/cdk/typings';

describe('[TEST] Coercion', () => {
    it('coerceBoolean returned true', () => {
        expect(coerceBoolean('')).toBe(true);
        expect(coerceBoolean('   ')).toBe(true);
        expect(coerceBoolean(true)).toBe(true);
        expect(coerceBoolean('true')).toBe(true);
        expect(coerceBoolean('12312s')).toBe(true);
        expect(coerceBoolean('0')).toBe(true);
        expect(coerceBoolean(1)).toBe(true);
        expect(coerceBoolean({} as Any)).toBe(true);
        expect(coerceBoolean([] as Any)).toBe(true);
    });

    it('coerceBoolean returned false', () => {
        expect(coerceBoolean(null)).toBe(false);
        expect(coerceBoolean(undefined)).toBe(false);
        expect(coerceBoolean(' false  ')).toBe(false);
        expect(coerceBoolean('false')).toBe(false);
        expect(coerceBoolean(false)).toBe(false);
        expect(coerceBoolean(0)).toBe(false);
    });
});
