import {TestBed} from '@angular/core/testing';
import {LoggerService, provideLogger} from '@angular-ru/cdk/logger';

import {ConsoleFake, TestLoggerLineType} from './helpers/console-fake';

describe('[TEST]: Check JSON', () => {
    let logger: LoggerService;
    const fakeConsole: ConsoleFake = new ConsoleFake();

    beforeAll(() => {
        TestBed.configureTestingModule({
            providers: [provideLogger({instance: fakeConsole})],
        });

        logger = TestBed.inject(LoggerService);
    });

    it('should be pretty json', () => {
        logger.clear();
        logger.log(logger.prettyJSON({a: true, b: [1, 2], c: 'test string', d: null}));

        expect(fakeConsole.stack()).toEqual(
            fakeConsole.createStack({
                [TestLoggerLineType.LOG]: [
                    [
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
                        '',
                    ],
                ],
            }),
        );
    });
});
