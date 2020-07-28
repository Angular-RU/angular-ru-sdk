import { PlainObject } from '@angular-ru/common/typings';
import { TestBed } from '@angular/core/testing';
import { LoggerService } from '../../src/logger.service';
import { ConsoleFake } from './helpers/console-fake';
import { LoggerModule } from '../../src/logger.module';

describe('[TEST]: Check clipboard', () => {
    let logger: LoggerService;
    let buffer: string | null = null;
    const fakeConsole: ConsoleFake = new ConsoleFake();
    const textarea: Partial<HTMLTextAreaElement> = {
        textContent: null,
        style: {} as CSSStyleDeclaration,
        select: (): void => {}
    };

    beforeAll(() => {
        TestBed.configureTestingModule({
            imports: [
                LoggerModule.forRoot({
                    instance: fakeConsole
                })
            ]
        });

        logger = TestBed.get(LoggerService);
    });

    beforeEach(() => {
        buffer = null;
        window.clipboardData = null!;
        document.queryCommandSupported = null!;
        textarea.textContent = null!;
        document.execCommand = null!;
    });

    it(`Copy is security and save data local memory`, () => {
        Object.defineProperty(window, 'clipboardData', {
            writable: true,
            value: {
                setData: (type: string, value: string): void | boolean => {
                    if (type === 'Text') {
                        buffer = value;
                        return true;
                    }
                }
            }
        });

        const stringValue: string = 'test string';
        const isExec: boolean = logger.copy(stringValue);

        expect(isExec).toEqual(true);
        expect(buffer).toEqual(stringValue);
    });

    it('should be correct copy/paste document copy', () => {
        createMockQueryCommands(textarea);

        Object.defineProperty(document, 'execCommand', {
            writable: true,
            value: (): void | boolean => {
                buffer = textarea.textContent!;
                return true;
            }
        });

        const JsonValue: PlainObject = { a: 1, b: [1, 2, 3] };
        const isExec: boolean = logger.copy(JsonValue);

        expect(isExec).toEqual(true);
        expect(buffer).toEqual(JSON.stringify(JsonValue, null, 4));
    });

    it('should be throw exception when incorrect execCommand', () => {
        createMockQueryCommands(textarea);

        const JsonValue: PlainObject = { a: 1, b: [1, 2, 3] };
        const isExec: boolean = logger.copy(JsonValue);

        expect(isExec).toEqual(false);
        expect(buffer).toEqual(null);
    });

    it(`should be correct fallback`, () => {
        const stringValue: string = 'test string';
        const isExec: boolean = logger.copy(stringValue);

        expect(isExec).toEqual(false);
        expect(buffer).toEqual(null);
    });
});

function createMockQueryCommands(textareaRef: Partial<HTMLTextAreaElement>): void {
    Object.defineProperty(document, 'queryCommandSupported', {
        writable: true,
        value: (): void | boolean => true
    });

    Object.defineProperty(document, 'body', {
        writable: true,
        value: {
            appendChild: (): void => {},
            removeChild: (): void => {}
        }
    });

    Object.defineProperty(document, 'createElement', {
        writable: true,
        value: (elementName: string): Partial<HTMLTextAreaElement> | any => {
            if (elementName === 'textarea') {
                return textareaRef;
            }
        }
    });
}
