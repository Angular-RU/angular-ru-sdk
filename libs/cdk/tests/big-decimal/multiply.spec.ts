import {BigDecimal} from '@angular-ru/cdk/big-decimal';

describe('[TEST]: BigDecimal - multiply', () => {
    it('should be defined', () => {
        expect(BigDecimal.multiply).toBeDefined();
    });

    it('should: 12 * 13 = 156', () => {
        expect(BigDecimal.multiply('12', '13')).toBe('156');
    });

    it('should: 12 * 0 = 0', () => {
        expect(BigDecimal.multiply('12', '0')).toBe('0');
    });

    it('should: 13 * 130 = 1690', () => {
        expect(BigDecimal.multiply('13', '130')).toBe('1690');
    });

    it('should: 0.13 * 0.00130 = 0.000169', () => {
        expect(BigDecimal.multiply('0.13', '0.00130')).toBe('0.000169');
    });

    it('should: 0.5 * 0.2 = 0.1', () => {
        expect(BigDecimal.multiply('0.5', '0.2')).toBe('0.1');
    });

    it('should: 0.05 * 0.02 = 0.001', () => {
        expect(BigDecimal.multiply('0.05', '0.02')).toBe('0.001');
    });

    it('should: 0.5 * 0.02 = 0.01', () => {
        expect(BigDecimal.multiply('0.5', '0.02')).toBe('0.01');
    });

    it('should: -0.13 * 0.00130 = -0.000169', () => {
        expect(BigDecimal.multiply('-0.13', '0.00130')).toBe('-0.000169');
    });

    it('should: 0.5 * -0.2 = -0.1', () => {
        expect(BigDecimal.multiply('0.5', '-0.2')).toBe('-0.1');
    });

    it('should: -0.05 * -0.02 = 0.001', () => {
        expect(BigDecimal.multiply('-0.05', '-0.02')).toBe('0.001');
    });

    it('should: -12 * 13 = -156', () => {
        expect(BigDecimal.multiply('-12', '13')).toBe('-156');
    });

    it('should: -12 * 0 = 0', () => {
        expect(BigDecimal.multiply('-12', '0')).toBe('0');
    });

    it('should: 12 * -0 = 0', () => {
        expect(BigDecimal.multiply('12', '-0')).toBe('0');
    });

    it('should: -12 * -0 = 0', () => {
        expect(BigDecimal.multiply('-12', '-0')).toBe('0');
    });

    it('should: -0.0000005 * 13 = -0.0000065', () => {
        expect(BigDecimal.multiply('-0.0000005', '13')).toBe('-0.0000065');
    });
});
