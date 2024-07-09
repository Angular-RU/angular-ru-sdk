import {BigDecimal} from '@angular-ru/cdk/big-decimal';

describe('[TEST]: BigDecimal - add', () => {
    it('should be defined', () => {
        expect(BigDecimal.add).toBeDefined();
    });

    it('should: 12+13 = 25', () => {
        expect(BigDecimal.add('12', '13')).toBe('25');
    });

    it('should: 12-13 = -1', () => {
        expect(BigDecimal.add('12', '-13')).toBe('-1');
    });

    it('should: 12.12+13.94 = 26.06', () => {
        expect(BigDecimal.add('12.12', '13.94')).toBe('26.06');
    });

    it('should: 12-135 = -123', () => {
        expect(BigDecimal.add('12', '-135')).toBe('-123');
    });

    it('should: 12.67+13 = 25.67', () => {
        expect(BigDecimal.add('12.67', '13')).toBe('25.67');
    });

    it('should: -12.67+13 = 0.33', () => {
        expect(BigDecimal.add('-12.67', '13')).toBe('0.33');
    });

    it('should: 12.67-13 = -0.33', () => {
        expect(BigDecimal.add('12.67', '-13')).toBe('-0.33');
    });

    it('should: -12.67-13 = -0.33', () => {
        expect(BigDecimal.add('-12.67', '-13')).toBe('-25.67');
    });

    it('should: 12.67+.13 = 12.80', () => {
        expect(BigDecimal.add('12.67', '.13')).toBe('12.80');
    });

    it('should: 100-12 = 88', () => {
        expect(BigDecimal.add('100', '-12')).toBe('88');
    });

    it('should: 126.7-13 = 113.7', () => {
        expect(BigDecimal.add('126.7', '-13')).toBe('113.7');
    });
    it('should: 12.67-130.7 = -118.03', () => {
        expect(BigDecimal.add('12.67', '-130.7')).toBe('-118.03');
    });
});
