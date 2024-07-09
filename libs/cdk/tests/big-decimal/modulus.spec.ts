import {BigDecimal} from '@angular-ru/cdk/big-decimal';

describe('[TEST]: BigDecimal - modulus', () => {
    it('should modulus(7,4) = 3', () => {
        expect(BigDecimal.modulus(7, 4)).toBe('3');
    });

    it('should modulus(-7,4) = -3', () => {
        expect(BigDecimal.modulus(-7, 4)).toBe('-3');
    });

    it('should modulus(7,-4) = 3', () => {
        expect(BigDecimal.modulus(7, -4)).toBe('3');
    });

    it('should modulus(-7,-4) = 3', () => {
        expect(BigDecimal.modulus(-7, -4)).toBe('-3');
    });

    it('should modulus(-7,0) throw', () => {
        expect(() => BigDecimal.modulus(-7, 0)).toThrow('');
    });

    it('should modulus(76457896543456%77732) = 45352', () => {
        expect(BigDecimal.modulus('76457896543456', '77732')).toBe('45352');
    });

    it('should modulus(7.5%3.2) to throw error', () => {
        expect(() => BigDecimal.modulus('7.5', '3.2')).toThrow('');
    });

    it('should modulus(75%3.2) to throw error', () => {
        expect(() => BigDecimal.modulus('75', '3.2')).toThrow('');
    });

    it('should modulus(7.5%32) to throw error', () => {
        expect(() => BigDecimal.modulus('7.5', '32')).toThrow('');
    });
});
