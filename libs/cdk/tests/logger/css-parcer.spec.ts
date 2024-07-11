import {TestBed} from '@angular/core/testing';
import {LoggerLevel, LoggerModule, LoggerService} from '@angular-ru/cdk/logger';

import {ConsoleFake, TestLoggerLineType} from './helpers/console-fake';

describe('[TEST]: Check style', () => {
    describe('case #1', () => {
        let logger: LoggerService;
        const fakeConsole: ConsoleFake = new ConsoleFake();

        const testString = 'test string';

        beforeAll(() => {
            TestBed.configureTestingModule({
                imports: [
                    LoggerModule.forRoot({
                        instance: fakeConsole,
                        cssClassMap: {
                            'class-1': 'font-weight: bold',
                            'class-2': 'text-decoration: line-through',
                            'class-3': 'color: #666',
                        },
                    }),
                ],
            });

            logger = TestBed.inject(LoggerService);
        });

        beforeEach(() => logger.clear());

        it('set style another console line', () => {
            logger.level = LoggerLevel.ALL;

            logger
                .css('color: red; text-decoration: underline; font-weight: bold')
                .info("It's awesome");

            expect(fakeConsole.stack()).toEqual(
                fakeConsole.createStack({
                    [TestLoggerLineType.INFO]: [
                        'color: red; text-decoration: underline; font-weight: bold;',
                        "It's awesome",
                    ],
                }),
            );
        });

        it('add css class', () => {
            logger.cssClass('class-1 class-3').log('Hello world');

            expect(fakeConsole.stack()).toEqual(
                fakeConsole.createStack({
                    [TestLoggerLineType.LOG]: [
                        '%c%s',
                        'font-weight: bold; color: #666;',
                        'Hello world',
                    ],
                }),
            );

            logger.clear();

            logger.cssClass('class-2').debug('Test 2');
            expect(fakeConsole.stack()).toEqual(
                fakeConsole.createStack({
                    [TestLoggerLineType.DEBUG]: [
                        'text-decoration: line-through;',
                        'Test 2',
                    ],
                }),
            );
        });

        it('clear line style', () => {
            // with style
            logger.css('font-weight: bold');
            expect(logger.getCurrentLineStyle()).toBe('font-weight: bold;');

            // without style
            logger.css('font-weight: bold');
            logger.clearCssCurrentLine();
            expect(logger.getCurrentLineStyle()).toBe('');
        });

        it('get current line style', () => {
            logger.css(
                'text-transform: uppercase, font-weight: bold, font-size: 12px, margin: 10px, padding: 10px',
            );

            expect(logger.getCurrentLineStyle()).toBe(
                'text-transform: uppercase, font-weight: bold, font-size: 12px, margin: 10px, padding: 10px;',
            );
        });

        it('should work with empty cssClass', () => {
            logger.cssClass('').debug(testString);

            expect(logger.getCurrentLineStyle()).toBe('');
        });
    });

    describe('case #2', () => {
        let logger: LoggerService;
        const fakeConsole: ConsoleFake = new ConsoleFake();
        const testString = 'test string';

        beforeAll(() => {
            TestBed.configureTestingModule({
                imports: [
                    LoggerModule.forRoot({
                        instance: fakeConsole,
                        globalLineStyle:
                            'color: violet; font-weight: bold; font-size: 12px',
                    }),
                ],
            });

            logger = TestBed.inject(LoggerService);
        });

        beforeEach(() => logger.clear());

        it('should use global styles', () => {
            logger.log(testString);
            expect(fakeConsole.stack()).toBe(
                '[{"log":["%c%s","color: violet; font-weight: bold; font-size: 12px;","test string"]}]',
            );
        });

        it('should use global styles and work with empty css', () => {
            logger.css('').log(testString);
            expect(fakeConsole.stack()).toBe(
                '[{"log":["%c%s","color: violet; font-weight: bold; font-size: 12px;","test string"]}]',
            );
        });
    });
});
