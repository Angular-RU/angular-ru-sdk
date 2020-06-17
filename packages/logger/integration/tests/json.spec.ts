import { LoggerService } from '../../src/logger.service';
import { ConsoleFake, TestLoggerLineType } from './helpers/console-fake';
import { TestBed } from '@angular/core/testing';
import { LoggerModule } from '../../src/logger.module';

describe('[TEST]: Check JSON', () => {
    let logger: LoggerService;
    const fakeConsole: ConsoleFake = new ConsoleFake();

    beforeAll(() => {
        TestBed.configureTestingModule({
            imports: [LoggerModule.forRoot({ instance: fakeConsole })]
        });

        logger = TestBed.get(LoggerService);
    });

    it('should be pretty json', () => {
        logger.clear();
        logger.log(logger.prettyJSON({ a: true, b: [1, 2], c: 'test string', d: null }));

        expect(fakeConsole.stack()).toEqual(
            fakeConsole.createStack({
                [TestLoggerLineType.LOG]: [
                    [
                        // tslint:disable-next-line:max-line-length
                        '{\n  %c"a":%c %ctrue%c,\n  %c"b":%c [\n    %c1%c,\n    %c2%c\n  ],\n  %c"c":%c %c"test string"%c,\n  %c"d":%c %cnull%c\n}',
                        'color:red',
                        '',
                        'color:blue',
                        '',
                        'color:red',
                        '',
                        'color:darkorange',
                        '',
                        'color:darkorange',
                        '',
                        'color:red',
                        '',
                        'color:green',
                        '',
                        'color:red',
                        '',
                        'color:magenta',
                        ''
                    ]
                ]
            })
        );
    });
});
