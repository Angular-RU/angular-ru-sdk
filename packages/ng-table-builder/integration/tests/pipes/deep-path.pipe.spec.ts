/* eslint-disable */
import { KeyMap } from '../../../src/interfaces/table-builder.internal';
import { DeepPathPipe } from '../../../src/pipes/deep-path.pipe';

describe('[TEST]: Deep path pipe', () => {
    let pipe: DeepPathPipe;

    beforeEach(() => (pipe = new DeepPathPipe()));

    it('should be correct extract', () => {
        const b: KeyMap = pipe.transform(
            {
                a: {
                    b: {
                        c: 1
                    }
                }
            },
            'a.b'
        );

        expect(b).toEqual({
            c: 1
        });

        const c: number = pipe.transform(
            {
                a: {
                    b: {
                        c: 1
                    }
                }
            },
            'a.b.c'
        );

        expect(c).toEqual(1);
    });

    it('should be correct return object when set empty path', () => {
        const result: KeyMap = pipe.transform({ a: { b: 1 } }, '');
        expect(result).toEqual({ a: { b: 1 } });
    });

    it('should be correct create cache and invalidate', () => {
        const a: KeyMap = { a: { b: 1 } };
        const b: KeyMap = { a: { b: 2 } };
        const c: KeyMap = { a: { b: [1, 2, 3] } };
        expect(pipe.transform(a, 'a.b')).toEqual(1);
        expect(pipe.transform(b, 'a.b')).toEqual(2);
        expect(pipe.transform(b, 'a')).toEqual({ b: 2 });
        expect(pipe.transform(c, 'a.b.2')).toEqual(3);
    });
});
