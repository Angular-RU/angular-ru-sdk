import { LoggerService } from '../../src/logger.service';
import { ConsoleFake, TestLoggerLineType } from './helpers/console-fake';
import { TestBed } from '@angular/core/testing';
import { LoggerModule } from '../../src/logger.module';
import { LoggerLevel } from '../../src/interfaces/logger.external';

describe('[TEST]: Check style', () => {
    let logger: LoggerService;
    const fakeConsole: ConsoleFake = new ConsoleFake();

    const testString: string = 'test string';

    beforeAll(() => {
        TestBed.configureTestingModule({
            imports: [
                LoggerModule.forRoot({
                    instance: fakeConsole,
                    cssClassMap: {
                        'class-1': 'font-weight: bold',
                        'class-2': 'text-decoration: line-through',
                        'class-3': 'color: #666'
                    }
                })
            ]
        });

        logger = TestBed.get(LoggerService);
    });

    beforeEach(() => logger.clear());

    it(`Set style another console line `, () => {
        logger.level = LoggerLevel.ALL;

        logger.css('color: red; text-decoration: underline; font-weight: bold').info(`It's awesome`);

        expect(fakeConsole.stack()).toEqual(
            fakeConsole.createStack({
                [TestLoggerLineType.INFO]: [
                    'color: red; text-decoration: underline; font-weight: bold;',
                    `It's awesome`
                ]
            })
        );
    });

    it('Add css class', () => {
        logger.cssClass('class-1 class-3').log('Hello world');

        expect(fakeConsole.stack()).toEqual(
            fakeConsole.createStack({
                [TestLoggerLineType.LOG]: ['%c%s', 'font-weight: bold; color: #666;', 'Hello world']
            })
        );

        logger.clear();

        logger.cssClass('class-2').debug('Test 2');
        expect(fakeConsole.stack()).toEqual(
            fakeConsole.createStack({ [TestLoggerLineType.DEBUG]: ['text-decoration: line-through;', 'Test 2'] })
        );
    });

    it('Clear line style', () => {
        // with style
        logger.css('font-weight: bold');
        expect(logger.getCurrentLineStyle()).toEqual('font-weight: bold;');

        // without style
        logger.css('font-weight: bold');
        logger.clearCssCurrentLine();
        expect(logger.getCurrentLineStyle()).toEqual('');
    });

    it('Get current line style', () => {
        logger.css('text-transform: uppercase, font-weight: bold, font-size: 12px, margin: 10px, padding: 10px');

        expect(logger.getCurrentLineStyle()).toEqual(
            'text-transform: uppercase, font-weight: bold, font-size: 12px, margin: 10px, padding: 10px;'
        );
    });

    it('should work with empty cssClass', () => {
        logger.cssClass('').debug(testString);

        expect(logger.getCurrentLineStyle()).toEqual('');
    });
});

describe('[TEST]: Check global styles', () => {
    let logger: LoggerService;
    const fakeConsole: ConsoleFake = new ConsoleFake();
    const testString: string = 'test string';

    beforeAll(() => {
        TestBed.configureTestingModule({
            imports: [
                LoggerModule.forRoot({
                    instance: fakeConsole,
                    globalLineStyle: 'color: violet; font-weight: bold; font-size: 12px'
                })
            ]
        });

        logger = TestBed.get(LoggerService);
    });

    beforeEach(() => logger.clear());

    it('should use global styles', () => {
        logger.log(testString);
        expect(fakeConsole.stack()).toEqual(
            '[{"log":["%c%s","color: violet; font-weight: bold; font-size: 12px;","test string"]}]'
        );
    });

    it('should use global styles and work with empty css', () => {
        logger.css('').log(testString);
        expect(fakeConsole.stack()).toEqual(
            '[{"log":["%c%s","color: violet; font-weight: bold; font-size: 12px;","test string"]}]'
        );
    });
});
