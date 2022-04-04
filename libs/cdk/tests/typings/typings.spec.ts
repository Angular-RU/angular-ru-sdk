import { DeepKeyOfList, KeyOfList, Leaves, Paths } from '@angular-ru/cdk/typings';

describe('[TEST]: Common types', () => {
    it('any: sample duck typing', () => {
        const a: any = 5;
        const b: any = '8';

        // Duck typing
        expect(parseInt(a + b)).toBe(58);
    });

    it('keyof', () => {
        class B {
            public c: string = '';
        }

        class A {
            public a: string = '';
            public b: B = new B();
        }

        const keys: KeyOfList<A> = ['a', 'b']; // output keys

        expect(keys).toEqual(['a', 'b']);
    });

    it('deep keyof', () => {
        class B {
            public c: string = '';
            public etc: { f: string } = { f: '' };
        }

        class A {
            public a: string = '';
            public b: B = new B();
        }

        const keys: DeepKeyOfList<A> = ['a', 'b.c', 'b.etc.f']; // output keys

        expect(keys).toEqual(['a', 'b.c', 'b.etc.f']);
    });

    it('leaves', () => {
        class B {
            public c: string = '';
            public etc: { f: string } = { f: '' };
        }

        class A {
            public a: string = '';
            public b: B = new B();
        }

        const keys: Leaves<A>[] = ['a', 'b.c', 'b.etc.f']; // output keys

        expect(keys).toEqual(['a', 'b.c', 'b.etc.f']);
    });

    it('paths', () => {
        class B {
            public c: string = '';
            public etc: { f: string } = { f: '' };
        }

        class A {
            public a: string = '';
            public b: B = new B();
        }

        const paths: Paths<A>[] = ['a', 'b', 'b.c', 'b.etc', 'b.etc.f']; // output keys

        expect(paths).toEqual(['a', 'b', 'b.c', 'b.etc', 'b.etc.f']);

        const etc: Paths<A['b']['etc']> = 'f';

        expect(etc).toBe('f');
    });
});
