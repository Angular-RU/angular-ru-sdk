import { $args, hasConstructor, isFunctionLike } from '@angular-ru/cdk/function';
import { Any, Fn, KeyboardKeys } from '@angular-ru/cdk/typings';

describe('[TEST]: Function', () => {
    it('is function', () => {
        class A {}

        expect(isFunctionLike(null)).toEqual(false);
        expect(isFunctionLike(A)).toEqual(true);
        expect(
            isFunctionLike(() => {
                // ...
            })
        ).toEqual(true);
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

        expect(hasConstructor(A)).toEqual(true);
        expect(hasConstructor(B)).toEqual(true);
        expect(hasConstructor(D)).toEqual(true);
        expect(hasConstructor(String)).toEqual(true);

        expect(hasConstructor(C)).toEqual(false);
        expect(hasConstructor({} as Any)).toEqual(false);
        expect(hasConstructor(1 as Any)).toEqual(false);
        expect(hasConstructor(null)).toEqual(false);
        expect(hasConstructor()).toEqual(false);
    });
});
