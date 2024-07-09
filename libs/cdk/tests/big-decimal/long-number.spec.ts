import {BigDecimal} from '@angular-ru/cdk/big-decimal';

describe('[TEST]: BigDecimal - long number', () => {
    it('should be defined', () => {
        const a: BigDecimal = new BigDecimal('444');

        expect(a).toBeDefined();
    });

    it('should be comparable', () => {
        const a: BigDecimal = new BigDecimal('111');
        const b: BigDecimal = new BigDecimal('222');
        const c: BigDecimal = new BigDecimal('111');

        expect(a.compareTo(b)).toBe(-1);
        expect(b.compareTo(a)).toBe(1);
        expect(a.compareTo(c)).toBe(0);
    });

    it('should be able to storage long numbers', () => {
        const minString: string = '-9223372036854775808';
        const maxString: string = '9223372036854775807';

        const min: BigDecimal = new BigDecimal(minString);
        const max: BigDecimal = new BigDecimal(maxString);

        expect(min.getValue()).toBe(minString);
        expect(max.getValue()).toBe(maxString);
    });
});
