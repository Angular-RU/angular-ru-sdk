import { isFunctionLike } from '@angular-ru/common/function';
import { KeyboardKeys } from '@angular-ru/common/typings';

describe('[TEST]: Function', () => {
    it('is function', () => {
        class A {}

        expect(isFunctionLike(null)).toEqual(false);
        expect(isFunctionLike(A)).toEqual(true);
        expect(isFunctionLike(() => {})).toEqual(true);
        expect(isFunctionLike(1)).toEqual(false);
        expect(isFunctionLike({})).toEqual(false);
        expect(isFunctionLike([])).toEqual(false);
        expect(isFunctionLike('')).toEqual(false);
    });

    it('typeofType', () => {
        expect(KeyboardKeys.ARROW_DOWN).toEqual('ArrowDown');
        expect(KeyboardKeys.ARROW_LEFT).toEqual('ArrowLeft');
        expect(KeyboardKeys.ARROW_RIGHT).toEqual('ArrowRight');
        expect(KeyboardKeys.ARROW_UP).toEqual('ArrowUp');
        expect(KeyboardKeys.BACKSPACE).toEqual('Backspace');
        expect(KeyboardKeys.SHIFT).toEqual('Shift');
        expect(KeyboardKeys.CAPS_LOCK).toEqual('CapsLock');
    });
});
