import {BigDecimal} from '@angular-ru/cdk/big-decimal';

describe('[TEST]: BigDecimal - main', () => {
    it('should be defined', () => {
        expect(BigDecimal).toBeDefined();
    });

    describe('constructor', () => {
        it('should return same value after creating Object', () => {
            const n = new BigDecimal(12.34);

            expect(n.getValue()).toBe('12.34');
        });

        describe('missing leadinh zero', () => {
            it('should transform .123 to 0.123', () => {
                const n = new BigDecimal('.123');

                expect(n.getValue()).toBe('0.123');
            });

            it('should transform -.123 to -0.123', () => {
                const n = new BigDecimal('-.123');

                expect(n.getValue()).toBe('-0.123');
            });
        });

        describe('exponentiation', () => {
            it('should transform 13.45e-5 to 0.0001345', () => {
                const n = new BigDecimal('13.45e-5');

                expect(n.getValue()).toBe('0.0001345');
            });

            it('should transform 13.45e-4 to 0.001345', () => {
                const n = new BigDecimal('13.45e-4');

                expect(n.getValue()).toBe('0.001345');
            });

            it('should transform 13.45e-3 to 0.01345', () => {
                const n = new BigDecimal('13.45e-3');

                expect(n.getValue()).toBe('0.01345');
            });

            it('should transform 13.45e-2 to 0.1345', () => {
                const n = new BigDecimal('13.45e-2');

                expect(n.getValue()).toBe('0.1345');
            });

            it('should transform 13.45e-1 to 1.345', () => {
                const n = new BigDecimal('13.45e-1');

                expect(n.getValue()).toBe('1.345');
            });

            it('should transform 13.45e0 to 13.45', () => {
                const n = new BigDecimal('13.45e0');

                expect(n.getValue()).toBe('13.45');
            });

            it('should transform 13.45e1 to 134.5', () => {
                const n = new BigDecimal('13.45e1');

                expect(n.getValue()).toBe('134.5');
            });

            it('should transform 13.45e2 to 1345', () => {
                const n = new BigDecimal('13.45e2');

                expect(n.getValue()).toBe('1345');
            });

            it('should transform 13.45e+3 to 13450', () => {
                const n = new BigDecimal('13.45e+3');

                expect(n.getValue()).toBe('13450');
            });

            it('should transform 13.45e4 to 134500', () => {
                const n = new BigDecimal('13.45e4');

                expect(n.getValue()).toBe('134500');
            });

            it('should transform 0.1345e2 to 13.45', () => {
                const n = new BigDecimal('0.1345e2');

                expect(n.getValue()).toBe('13.45');
            });

            it('should transform 0.1345e1 to 1.345', () => {
                const n = new BigDecimal('0.1345e1');

                expect(n.getValue()).toBe('1.345');
            });

            it('should transform 2e-2 to 0.02', () => {
                const n = new BigDecimal('2e-2');

                expect(n.getValue()).toBe('0.02');
            });

            it('should transform 0.1345e-1 to 0.01345', () => {
                const n = new BigDecimal('0.1345e-1');

                expect(n.getValue()).toBe('0.01345');
            });

            it('should transform 0.1345e-2 to 0.001345', () => {
                const n = new BigDecimal('0.1345e-2');

                expect(n.getValue()).toBe('0.001345');
            });

            it('should transform 0.0134e2 to 1.34', () => {
                const n = new BigDecimal('0.0134e2');

                expect(n.getValue()).toBe('1.34');
            });

            it('should transform 0.0134e1 to 0.1345', () => {
                const n = new BigDecimal('0.0134e1');

                expect(n.getValue()).toBe('0.134');
            });

            it('should transform 0.0134e0 to 0.0134', () => {
                const n = new BigDecimal('0.0134e0');

                expect(n.getValue()).toBe('0.0134');
            });

            it('should transform 0.0134e-1 to 0.00134', () => {
                const n = new BigDecimal('0.0134e-1');

                expect(n.getValue()).toBe('0.00134');
            });

            it('should transform 0.0134e-2 to 0.000134', () => {
                const n = new BigDecimal('0.0134e-2');

                expect(n.getValue()).toBe('0.000134');
            });
        });
    });

    describe('round', () => {
        it('should round off 12.678 to 12.68 if precision is set to 2', () => {
            const n = new BigDecimal('12.678');

            expect(n.round(2).getValue()).toBe('12.68');
        });

        it('should round off 12.678 to 13 if precision is not passed', () => {
            const n = new BigDecimal('12.678');

            expect(n.round().getValue()).toBe('13');
        });

        it('should round off 12.2678 to 12 if precision is set to 0', () => {
            expect(BigDecimal.round('12.2678', 0)).toBe('12');
        });
    });

    describe('pretty', () => {
        it('should transform 1567866522.26567 to 1,567,866,522.26567 if pretty is called without arguments', () => {
            const n = new BigDecimal('1567866522.26567');

            expect(n.getPrettyValue()).toBe('1,567,866,522.26567');
        });

        it('should transform 1234567890123456 to 1234-5678-9012-3456 if pretty is called with 4, -', () => {
            const n = new BigDecimal('1234567890123456');

            expect(n.getPrettyValue(4, '-')).toBe('1234-5678-9012-3456');
        });

        it('should transform 1567866522.26567 to 1,567,866,522.26567 if pretty is called without arguments using static method', () => {
            expect(BigDecimal.getPrettyValue('1567866522.26567')).toBe(
                '1,567,866,522.26567',
            );
        });

        it('should transform 1234567890123456 to 1234-5678-9012-3456 if pretty is called with 4, -  using static method', () => {
            expect(BigDecimal.getPrettyValue('1234567890123456', 4, '-')).toBe(
                '1234-5678-9012-3456',
            );
        });

        it('should transform -12.69 to -12.69', () => {
            expect(BigDecimal.getPrettyValue('-12.69')).toBe('-12.69');
        });

        it('should transform -123.69 to -123.69', () => {
            expect(BigDecimal.getPrettyValue('-123.69')).toBe('-123.69');
        });

        it('should transform -1234.69 to -1,234.69', () => {
            expect(BigDecimal.getPrettyValue('-1234.69')).toBe('-1,234.69');
        });
    });

    describe('add', () => {
        it('should produce 23.678+67.34=91.018', () => {
            expect(BigDecimal.add('23.678', '67.34')).toBe('91.018');
        });

        it('should produce -23.678+67.34=43.662', () => {
            expect(BigDecimal.add('-23.678', '67.34')).toBe('43.662');
        });

        it('should produce -23.678-67.34=-91.018', () => {
            expect(BigDecimal.add('-23.678', '-67.34')).toBe('-91.018');
        });

        it('should produce -23.678-67.34=-91.018 using static method', () => {
            expect(
                new BigDecimal('-23.678').add(new BigDecimal('-67.34')).getValue(),
            ).toBe(new BigDecimal('-91.018').getValue());
        });

        it('should produce -23.678=-23.678', () => {
            expect(BigDecimal.add('-23.678')).toBe('-23.678');
        });
    });

    describe('compareTo', () => {
        it('should produce 23.678, 67.34= -1', () => {
            expect(BigDecimal.compareTo('23.678', '67.34')).toBe(-1);
        });

        it('should produce 23.678, -67.34= 1', () => {
            expect(BigDecimal.compareTo('23.678', '-67.34')).toBe(1);
        });

        it('should produce .678, 0.67800= 0', () => {
            expect(BigDecimal.compareTo('.678', '0.67800')).toBe(0);
        });

        it('should produce 23.678, 67.34= -1 using static method', () => {
            expect(new BigDecimal('23.678').compareTo(new BigDecimal('67.34'))).toBe(-1);
        });

        it('should produce 23.678, -67.34= 1 using static method', () => {
            expect(new BigDecimal('23.678').compareTo(new BigDecimal('-67.34'))).toBe(1);
        });

        it('should produce .678, 0.67800= 0 using static method', () => {
            expect(new BigDecimal('.678').compareTo(new BigDecimal('0.67800'))).toBe(0);
        });
    });

    describe('multiply', () => {
        it('should: -12 * 0 = 0', () => {
            expect(new BigDecimal('-12').multiply(new BigDecimal('0')).getValue()).toBe(
                '0',
            );
        });

        it('should: 12 * -0 = 0', () => {
            expect(new BigDecimal('12').multiply(new BigDecimal('-0')).getValue()).toBe(
                '0',
            );
        });

        it('should: -12 * -0 = 0', () => {
            expect(new BigDecimal('-12').multiply(new BigDecimal('-0')).getValue()).toBe(
                '0',
            );
        });
        it('should: -0.0000005 * 13 = -0.0000065', () => {
            expect(
                new BigDecimal('-0.0000005').multiply(new BigDecimal('13')).getValue(),
            ).toBe('-0.0000065');
        });

        it('should: 12 * 13 = 156', () => {
            expect(new BigDecimal('12').multiply(new BigDecimal('13')).getValue()).toBe(
                '156',
            );
        });

        it('should: 13 * 130 = 1690', () => {
            expect(new BigDecimal('13').multiply(new BigDecimal('130')).getValue()).toBe(
                '1690',
            );
        });

        it('should: 0.13 * 0.00130 = 0.000169', () => {
            expect(
                new BigDecimal('0.13').multiply(new BigDecimal('0.00130')).getValue(),
            ).toBe('0.000169');
        });

        it('should: 0.5 * 0.2 = 0.1', () => {
            expect(new BigDecimal('0.5').multiply(new BigDecimal('0.2')).getValue()).toBe(
                '0.1',
            );
        });

        it('should: -0.13 * 0.00130 = -0.000169', () => {
            expect(
                new BigDecimal('-0.13').multiply(new BigDecimal('0.00130')).getValue(),
            ).toBe('-0.000169');
        });

        it('should: 13.0 * 0.00130 = 0.000169', () => {
            expect(BigDecimal.multiply('13.0', '0.00130')).toBe('0.0169');
        });

        it('should: -0.05 * -0.02 = 0.001', () => {
            expect(
                new BigDecimal('-0.05').multiply(new BigDecimal('-0.02')).getValue(),
            ).toBe('0.001');
        });

        it('should: .05 * .02 = 0.001', () => {
            expect(new BigDecimal('.05').multiply(new BigDecimal('.02')).getValue()).toBe(
                '0.001',
            );
        });
    });

    describe('divide', () => {
        it('should: 22 / 7 = 3.1428571429', () => {
            expect(BigDecimal.divide('22', '7', 10)).toBe('3.1428571429');
        });

        it('should: 72 / 13 = 5.53846153846154', () => {
            expect(BigDecimal.divide('72', '13')).toBe('5.53846154');
        });

        it('should: 24 / 120 = 0.2', () => {
            expect(new BigDecimal('24').divide(new BigDecimal('120'), 2).getValue()).toBe(
                '0.20',
            );
        });
    });

    describe('subtract', () => {
        it('should: -12 - 0 = -12', () => {
            expect(new BigDecimal('-12').subtract(new BigDecimal('0')).getValue()).toBe(
                '-12',
            );
        });

        it('should: 0 - 12 = -12', () => {
            expect(new BigDecimal('0').subtract(new BigDecimal('12')).getValue()).toBe(
                '-12',
            );
        });

        it('should: 12 - 12 = 0', () => {
            expect(new BigDecimal('12').subtract(new BigDecimal('12')).getValue()).toBe(
                '0',
            );
        });

        it('should: -12 - 12 = -24', () => {
            expect(new BigDecimal('-12').subtract(new BigDecimal('12')).getValue()).toBe(
                '-24',
            );
        });

        it('should: 12 - -12 = 24', () => {
            expect(new BigDecimal('12').subtract(new BigDecimal('-12')).getValue()).toBe(
                '24',
            );
        });

        it('should: 12 - -12.0 = 24', () => {
            expect(
                new BigDecimal('12').subtract(new BigDecimal('-12.0')).getValue(),
            ).toBe('24.0');
        });
    });
});
