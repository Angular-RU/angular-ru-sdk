import { Any, DeepKeyOfList, KeyOfList, Leaves, Paths } from '@angular-ru/common/typings';

describe('[TEST]: Common types', () => {
    it('any: sample duck typing', () => {
        const a: Any = 5;
        const b: Any = '8';

        // Duck typing
        expect(parseInt(a + b)).toEqual(58);
    });

    it('keyof', () => {
        class B {
            c: string = '';
        }

        class A {
            a: string = '';
            b: B = new B();
        }

        const keys: KeyOfList<A> = ['a', 'b']; // output keys
        expect(keys).toEqual(['a', 'b']);
    });

    it('deep keyof', () => {
        class B {
            c: string = '';
            etc: { f: string } = { f: '' };
        }

        class A {
            a: string = '';
            b: B = new B();
        }

        const keys: DeepKeyOfList<A> = ['a', 'b.c', 'b.etc.f']; // output keys
        expect(keys).toEqual(['a', 'b.c', 'b.etc.f']);
    });

    it('leaves', () => {
        class B {
            c: string = '';
            etc: { f: string } = { f: '' };
        }

        class A {
            a: string = '';
            b: B = new B();
        }

        const keys: Leaves<A>[] = ['a', 'b.c', 'b.etc.f']; // output keys
        expect(keys).toEqual(['a', 'b.c', 'b.etc.f']);
    });

    it('paths', () => {
        class B {
            c: string = '';
            etc: { f: string } = { f: '' };
        }

        class A {
            a: string = '';
            b: B = new B();
        }

        const paths: Paths<A>[] = ['a', 'b', 'b.c', 'b.etc', 'b.etc.f']; // output keys
        expect(paths).toEqual(['a', 'b', 'b.c', 'b.etc', 'b.etc.f']);

        const etc: Paths<A['b']['etc']> = 'f';
        expect(etc).toEqual('f');
    });
});
