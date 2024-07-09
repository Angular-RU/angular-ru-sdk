import {BigDecimal} from '@angular-ru/cdk/big-decimal';

describe('[TEST]: BigDecimal - subtract', () => {
    it('should be defined', () => {
        expect(BigDecimal.subtract).toBeDefined();
    });

    it('should: 12-13 = -1', () => {
        expect(BigDecimal.subtract('12', '13')).toBe('-1');
    });

    it('should: 12.67-13 = -0.33', () => {
        expect(BigDecimal.subtract('12.67', '13')).toBe('-0.33');
    });

    it('should: 12.67-.13 = 12.54', () => {
        expect(BigDecimal.subtract('12.67', '.13')).toBe('12.54');
    });

    it('should: 100-12 = 88', () => {
        expect(BigDecimal.subtract('100', '12')).toBe('88');
    });

    it('should: 126.7-13 = 113.7', () => {
        expect(BigDecimal.subtract('126.7', '13')).toBe('113.7');
    });

    it('should: 12.67-130.7 = -118.03', () => {
        expect(BigDecimal.subtract('12.67', '130.7')).toBe('-118.03');
    });
});
