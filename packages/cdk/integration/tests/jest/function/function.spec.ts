import { $args, hasConstructor, isFunctionLike } from '@angular-ru/cdk/function';
import { Any, Fn, KeyboardKeys } from '@angular-ru/cdk/typings';

describe('[TEST]: Function', () => {
    it('is function', () => {
        class A {}

        expect(isFunctionLike(null)).toBe(false);
        expect(isFunctionLike(A)).toBe(true);
        expect(
            isFunctionLike(() => {
                // ...
            })
        ).toBe(true);
        expect(isFunctionLike(1)).toBe(false);
        expect(isFunctionLike({})).toBe(false);
        expect(isFunctionLike([])).toBe(false);
        expect(isFunctionLike('')).toBe(false);
    });

    it('typeofType', () => {
        expect(KeyboardKeys.ARROW_DOWN).toBe('ArrowDown');
        expect(KeyboardKeys.ARROW_LEFT).toBe('ArrowLeft');
        expect(KeyboardKeys.ARROW_RIGHT).toBe('ArrowRight');
        expect(KeyboardKeys.ARROW_UP).toBe('ArrowUp');
        expect(KeyboardKeys.BACKSPACE).toBe('Backspace');
        expect(KeyboardKeys.SHIFT).toBe('Shift');
        expect(KeyboardKeys.CAPS_LOCK).toBe('CapsLock');
    });

    it('$arg', () => {
        function hello(name: string, value: number, a?: string[]): string {
            return `world${name}${value}${a}`;
        }

        expect($args(hello)).toEqual(['name', 'value', 'a']);
    });

    it('hasConstructor', () => {
        class A {}

        function B() {
            // ...
        }

        const C: Fn = () => {
            // ...
        };

        class D extends A {}

        expect(hasConstructor(A)).toBe(true);
        expect(hasConstructor(B)).toBe(true);
        expect(hasConstructor(D)).toBe(true);
        expect(hasConstructor(String)).toBe(true);

        expect(hasConstructor(C)).toBe(false);
        expect(hasConstructor({} as Any)).toBe(false);
        expect(hasConstructor(1 as Any)).toBe(false);
        expect(hasConstructor(null)).toBe(false);
        expect(hasConstructor()).toBe(false);
    });
});
