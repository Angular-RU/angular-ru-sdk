import { autoBind } from '../../src/decorators/autobind.decorator';

describe('@autoBind', () => {
    class Foo {
        @autoBind
        public getFoo(): this {
            return this;
        }

        public getFooAgain(): this {
            return this;
        }

        @autoBind
        public onlyOnFoo(): this {
            return this;
        }
    }

    class Bar extends Foo {
        @autoBind()
        public getFoo(): this {
            return super.getFoo();
        }

        public getSuperMethod_getFoo(): () => this {
            return super.getFoo;
        }

        @autoBind
        public onlyOnBar(): this {
            return this;
        }
    }

    it('returns a bound instance for a method', function (): void {
        const foo: Foo = new Foo();
        const { getFoo }: Foo = foo;

        expect(getFoo()).toEqual(foo);
    });

    it('sets the correct instance descriptor options when bound', function (): void {
        const foo: Foo = new Foo();
        const { getFoo }: Foo = foo;
        const desc: PropertyDescriptor = Object.getOwnPropertyDescriptor(foo, 'getFoo') as PropertyDescriptor;

        expect(desc.configurable).toEqual(true);
        expect(desc.enumerable).toEqual(false);
        expect(desc.writable).toEqual(true);
        expect(desc.value).toEqual(getFoo);
    });

    it('works with multiple instances of the same class', function (): void {
        const foo1: Foo = new Foo();
        const foo2: Foo = new Foo();

        const getFoo1: () => Foo = foo1.getFoo;
        const getFoo2: () => Foo = foo2.getFoo;

        expect(getFoo1()).toEqual(foo1);
        expect(getFoo2()).toEqual(foo2);
    });

    it('returns the same bound function every time', function (): void {
        const foo: Foo = new Foo();
        const bar: Bar = new Bar();

        expect(foo.getFoo).toEqual(foo.getFoo);
        expect(bar.getFoo).toEqual(bar.getFoo);
        expect(bar.getSuperMethod_getFoo()).toEqual(bar.getSuperMethod_getFoo());
        expect(bar.getFooAgain()).toEqual(bar.getFooAgain());
    });
});
