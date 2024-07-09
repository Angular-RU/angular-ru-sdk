import {BigDecimal, RoundingModes} from '@angular-ru/cdk/big-decimal';

describe('[TEST]: BigDecimal - round', () => {
    it('should return integer unchanged', () => {
        expect(BigDecimal.round(123456)).toBe('123456');
    });

    it('should return float with padded zeros if second argument is non-zero and first is integer', () => {
        expect(BigDecimal.round(123456, 2)).toBe('123456.00');
    });

    it('should return float with padded zeros if second argument is non-zero and first is floating', () => {
        expect(BigDecimal.round(12345.6, 2)).toBe('12345.60');
    });

    it('should return float with padded zeros if second argument is non-zero and first is floating as string', () => {
        expect(BigDecimal.round('044909.987', 5)).toBe('044909.98700');
    });

    it('should return float rounded appropriately if second argument is non-zero and first is floating', () => {
        expect(BigDecimal.round('96227983951.7293581', 5)).toBe('96227983951.72936');
    });

    it('should round(87.45, -1) = 90', () => {
        expect(BigDecimal.round('87.45', -1)).toBe('90');
    });

    it('should round(84.45, -1) = 80', () => {
        expect(BigDecimal.round('84.45', -1)).toBe('80');
    });

    it('should round(87.45, -2) = 0', () => {
        expect(BigDecimal.round('87.45', -2)).toBe('0');
    });

    it('should round(87.45, -3) = 0', () => {
        expect(BigDecimal.round('87.45', -3)).toBe('0');
    });

    it('should round(87, -1) = 90', () => {
        expect(BigDecimal.round('87', -1)).toBe('90');
    });

    it('should round(82, -1) = 80', () => {
        expect(BigDecimal.round('82', -1)).toBe('80');
    });

    it('should round 1e-8', () => {
        expect(BigDecimal.round(0.00000001, 10)).toBe('0.0000000100');
    });

    describe('test rounding mode UP', () => {
        it('should round(5.5, 0, UP) = 6', () => {
            expect(BigDecimal.round('5.5', 0, RoundingModes.UP)).toBe('6');
        });

        it('should round(2.6, 0, UP) = 3', () => {
            expect(BigDecimal.round('2.6', 0, RoundingModes.UP)).toBe('3');
        });

        it('should round(1.1, 0, UP) = 2', () => {
            expect(BigDecimal.round('1.1', 0, RoundingModes.UP)).toBe('2');
        });

        it('should round(1.0, 0, UP) = 1', () => {
            expect(BigDecimal.round('1.0', 0, RoundingModes.UP)).toBe('1');
        });

        it('should round(1, 0, UP) = 1', () => {
            expect(BigDecimal.round('1', 0, RoundingModes.UP)).toBe('1');
        });

        it('should round(-1.0, 0, UP) = -1', () => {
            expect(BigDecimal.round('-1.0', 0, RoundingModes.UP)).toBe('-1');
        });

        it('should round(-1.1, 0, UP) = -2', () => {
            expect(BigDecimal.round('-1.1', 0, RoundingModes.UP)).toBe('-2');
        });

        it('should round(-1.6, 0, UP) = -2', () => {
            expect(BigDecimal.round('-1.6', 0, RoundingModes.UP)).toBe('-2');
        });

        it('should round(-2.5, 0, UP) = -3', () => {
            expect(BigDecimal.round('-2.5', 0, RoundingModes.UP)).toBe('-3');
        });
    });

    describe('test rounding mode DOWN', () => {
        it('should round(5.5, 0, DOWN) = 5', () => {
            expect(BigDecimal.round('5.5', 0, RoundingModes.DOWN)).toBe('5');
        });

        it('should round(2.6, 0, DOWN) = 2', () => {
            expect(BigDecimal.round('2.6', 0, RoundingModes.DOWN)).toBe('2');
        });

        it('should round(1.1, 0, DOWN) = 1', () => {
            expect(BigDecimal.round('1.1', 0, RoundingModes.DOWN)).toBe('1');
        });

        it('should round(1.0, 0, DOWN) = 1', () => {
            expect(BigDecimal.round('1.0', 0, RoundingModes.DOWN)).toBe('1');
        });

        it('should round(1, 0, DOWN) = 1', () => {
            expect(BigDecimal.round('1', 0, RoundingModes.DOWN)).toBe('1');
        });

        it('should round(-1.0, 0, DOWN) = -1', () => {
            expect(BigDecimal.round('-1.0', 0, RoundingModes.DOWN)).toBe('-1');
        });

        it('should round(-1.1, 0, DOWN) = -1', () => {
            expect(BigDecimal.round('-1.1', 0, RoundingModes.DOWN)).toBe('-1');
        });

        it('should round(-1.6, 0, DOWN) = -1', () => {
            expect(BigDecimal.round('-1.6', 0, RoundingModes.DOWN)).toBe('-1');
        });

        it('should round(-2.5, 0, DOWN) = -2', () => {
            expect(BigDecimal.round('-2.5', 0, RoundingModes.DOWN)).toBe('-2');
        });
    });

    describe('test rounding mode CEILING', () => {
        it('should round(5.5, 0, CEILING) = 6', () => {
            expect(BigDecimal.round('5.5', 0, RoundingModes.CEILING)).toBe('6');
        });

        it('should round(2.6, 0, CEILING) = 3', () => {
            expect(BigDecimal.round('2.6', 0, RoundingModes.CEILING)).toBe('3');
        });

        it('should round(1.1, 0, CEILING) = 2', () => {
            expect(BigDecimal.round('1.1', 0, RoundingModes.CEILING)).toBe('2');
        });

        it('should round(1.0, 0, CEILING) = 1', () => {
            expect(BigDecimal.round('1.0', 0, RoundingModes.CEILING)).toBe('1');
        });

        it('should round(1, 0, CEILING) = 1', () => {
            expect(BigDecimal.round('1', 0, RoundingModes.CEILING)).toBe('1');
        });

        it('should round(-1.0, 0, CEILING) = -1', () => {
            expect(BigDecimal.round('-1.0', 0, RoundingModes.CEILING)).toBe('-1');
        });

        it('should round(-1.1, 0, CEILING) = -1', () => {
            expect(BigDecimal.round('-1.1', 0, RoundingModes.CEILING)).toBe('-1');
        });

        it('should round(-1.6, 0, CEILING) = -1', () => {
            expect(BigDecimal.round('-1.6', 0, RoundingModes.CEILING)).toBe('-1');
        });

        it('should round(-2.5, 0, CEILING) = -2', () => {
            expect(BigDecimal.round('-2.5', 0, RoundingModes.CEILING)).toBe('-2');
        });
    });

    describe('test rounding mode FLOOR', () => {
        it('should round(5.5, 0, FLOOR) = 5', () => {
            expect(BigDecimal.round('5.5', 0, RoundingModes.FLOOR)).toBe('5');
        });

        it('should round(2.6, 0, FLOOR) = 2', () => {
            expect(BigDecimal.round('2.6', 0, RoundingModes.FLOOR)).toBe('2');
        });

        it('should round(1.1, 0, FLOOR) = 1', () => {
            expect(BigDecimal.round('1.1', 0, RoundingModes.FLOOR)).toBe('1');
        });

        it('should round(1.0, 0, FLOOR) = 1', () => {
            expect(BigDecimal.round('1.0', 0, RoundingModes.FLOOR)).toBe('1');
        });

        it('should round(1, 0, FLOOR) = 1', () => {
            expect(BigDecimal.round('1', 0, RoundingModes.FLOOR)).toBe('1');
        });

        it('should round(-1.0, 0, FLOOR) = -1', () => {
            expect(BigDecimal.round('-1.0', 0, RoundingModes.FLOOR)).toBe('-1');
        });

        it('should round(-1.1, 0, FLOOR) = -2', () => {
            expect(BigDecimal.round('-1.1', 0, RoundingModes.FLOOR)).toBe('-2');
        });

        it('should round(-1.6, 0, FLOOR) = -2', () => {
            expect(BigDecimal.round('-1.6', 0, RoundingModes.FLOOR)).toBe('-2');
        });

        it('should round(-2.5, 0, FLOOR) = -3', () => {
            expect(BigDecimal.round('-2.5', 0, RoundingModes.FLOOR)).toBe('-3');
        });
    });

    describe('test rounding mode HALF_UP', () => {
        it('should round(5.5, 0, HALF_UP) = 6', () => {
            expect(BigDecimal.round('5.5', 0, RoundingModes.HALF_UP)).toBe('6');
        });

        it('should round(6.5, 0, HALF_UP) = 7', () => {
            expect(BigDecimal.round('6.5', 0, RoundingModes.HALF_UP)).toBe('7');
        });

        it('should round(2.6, 0, HALF_UP) = 3', () => {
            expect(BigDecimal.round('2.6', 0, RoundingModes.HALF_UP)).toBe('3');
        });

        it('should round(1.1, 0, HALF_UP) = 1', () => {
            expect(BigDecimal.round('1.1', 0, RoundingModes.HALF_UP)).toBe('1');
        });

        it('should round(1.0, 0, HALF_UP) = 1', () => {
            expect(BigDecimal.round('1.0', 0, RoundingModes.HALF_UP)).toBe('1');
        });

        it('should round(1, 0, HALF_UP) = 1', () => {
            expect(BigDecimal.round('1', 0, RoundingModes.HALF_UP)).toBe('1');
        });

        it('should round(-1.0, 0, HALF_UP) = -1', () => {
            expect(BigDecimal.round('-1.0', 0, RoundingModes.HALF_UP)).toBe('-1');
        });

        it('should round(-1.1, 0, HALF_UP) = -1', () => {
            expect(BigDecimal.round('-1.1', 0, RoundingModes.HALF_UP)).toBe('-1');
        });

        it('should round(-1.6, 0, HALF_UP) = -2', () => {
            expect(BigDecimal.round('-1.6', 0, RoundingModes.HALF_UP)).toBe('-2');
        });

        it('should round(-2.5, 0, HALF_UP) = -3', () => {
            expect(BigDecimal.round('-2.5', 0, RoundingModes.HALF_UP)).toBe('-3');
        });

        it('should round(-3.5, 0, HALF_UP) = -4', () => {
            expect(BigDecimal.round('-3.5', 0, RoundingModes.HALF_UP)).toBe('-4');
        });

        it('should round(-597.998, 2, HALF_UP) = -598.00', () => {
            expect(BigDecimal.round('-597.998', 2, RoundingModes.HALF_UP)).toBe(
                '-598.00',
            );
        });
    });

    describe('test rounding mode HALF_DOWN', () => {
        it('should round(5.5, 0, HALF_DOWN) = 5', () => {
            expect(BigDecimal.round('5.5', 0, RoundingModes.HALF_DOWN)).toBe('5');
        });

        it('should round(6.5, 0, HALF_DOWN) = 6', () => {
            expect(BigDecimal.round('6.5', 0, RoundingModes.HALF_DOWN)).toBe('6');
        });

        it('should round(2.6, 0, HALF_DOWN) = 3', () => {
            expect(BigDecimal.round('2.6', 0, RoundingModes.HALF_DOWN)).toBe('3');
        });

        it('should round(1.1, 0, HALF_DOWN) = 1', () => {
            expect(BigDecimal.round('1.1', 0, RoundingModes.HALF_DOWN)).toBe('1');
        });

        it('should round(1.0, 0, HALF_DOWN) = 1', () => {
            expect(BigDecimal.round('1.0', 0, RoundingModes.HALF_DOWN)).toBe('1');
        });

        it('should round(1, 0, HALF_DOWN) = 1', () => {
            expect(BigDecimal.round('1', 0, RoundingModes.HALF_DOWN)).toBe('1');
        });

        it('should round(-1.0, 0, HALF_DOWN) = -1', () => {
            expect(BigDecimal.round('-1.0', 0, RoundingModes.HALF_DOWN)).toBe('-1');
        });

        it('should round(-1.1, 0, HALF_DOWN) = -1', () => {
            expect(BigDecimal.round('-1.1', 0, RoundingModes.HALF_DOWN)).toBe('-1');
        });

        it('should round(-1.6, 0, HALF_DOWN) = -2', () => {
            expect(BigDecimal.round('-1.6', 0, RoundingModes.HALF_DOWN)).toBe('-2');
        });

        it('should round(-2.5, 0, HALF_DOWN) = -2', () => {
            expect(BigDecimal.round('-2.5', 0, RoundingModes.HALF_DOWN)).toBe('-2');
        });

        it('should round(-3.5, 0, HALF_DOWN) = -3', () => {
            expect(BigDecimal.round('-3.5', 0, RoundingModes.HALF_DOWN)).toBe('-3');
        });
    });

    describe('test rounding mode HALF_EVEN - default', () => {
        it('should round(5.5, 0) = 6', () => {
            expect(BigDecimal.round('5.5', 0)).toBe('6');
        });

        it('should round(6.5, 0) = 6', () => {
            expect(BigDecimal.round('6.5', 0)).toBe('6');
        });

        it('should round(2.6, 0) = 3', () => {
            expect(BigDecimal.round('2.6', 0)).toBe('3');
        });

        it('should round(1.1, 0) = 1', () => {
            expect(BigDecimal.round('1.1', 0)).toBe('1');
        });

        it('should round(1.0, 0) = 1', () => {
            expect(BigDecimal.round('1.0', 0)).toBe('1');
        });

        it('should round(1, 0) = 1', () => {
            expect(BigDecimal.round('1', 0)).toBe('1');
        });

        it('should round(-1.0, 0) = -1', () => {
            expect(BigDecimal.round('-1.0', 0)).toBe('-1');
        });

        it('should round(-1.1, 0) = -1', () => {
            expect(BigDecimal.round('-1.1', 0)).toBe('-1');
        });

        it('should round(-1.6, 0) = -2', () => {
            expect(BigDecimal.round('-1.6', 0)).toBe('-2');
        });

        it('should round(-2.5, 0) = -2', () => {
            expect(BigDecimal.round('-2.5', 0)).toBe('-2');
        });

        it('should round(-3.5, 0) = -4', () => {
            expect(BigDecimal.round('-3.5', 0)).toBe('-4');
        });
    });

    it('should ceil(0) = 0', () => {
        expect(BigDecimal.ceil(0)).toBe('0');
    });

    it('should floor 0', () => {
        expect(BigDecimal.floor(0)).toBe('0');
    });

    it('should ceil(0.00001341) = 1', () => {
        expect(BigDecimal.ceil('0.00001341')).toBe('1');
    });

    it('should floor 0.00001341  = 0 as string', () => {
        expect(BigDecimal.floor('0.00001341')).toBe('0');
    });

    it('should floor 0.00001341  = 0 as number', () => {
        expect(BigDecimal.floor(0.00001341)).toBe('0');
    });

    it('should ceil(13) = 13', () => {
        expect(BigDecimal.ceil(13)).toBe('13');
    });

    it('should floor(13) = 13', () => {
        expect(BigDecimal.floor(13)).toBe('13');
    });

    it('should ceil(13.3) = 14', () => {
        expect(BigDecimal.ceil(13.3)).toBe('14');
    });

    it('should floor(13.3) = 13', () => {
        expect(BigDecimal.floor(13.3)).toBe('13');
    });

    it('should ceil(13.8) = 14', () => {
        expect(BigDecimal.ceil(13.8)).toBe('14');
    });

    it('should floor(13.8) = 13', () => {
        expect(BigDecimal.floor(13.8)).toBe('13');
    });

    it('should ceil(-13.3) = -13', () => {
        expect(BigDecimal.ceil(-13.3)).toBe('-13');
    });

    it('should floor(-13.3) = -14', () => {
        expect(BigDecimal.floor(-13.3)).toBe('-14');
    });

    it('should ceil(-13.8) = -13', () => {
        expect(BigDecimal.ceil(-13.8)).toBe('-13');
    });

    it('should floor(-13.8) = -14', () => {
        expect(BigDecimal.floor(-13.8)).toBe('-14');
    });
});
