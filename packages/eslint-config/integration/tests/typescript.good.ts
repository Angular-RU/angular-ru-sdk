import { A1 } from './module/a1';
import { B1 } from './module/b1';

type SmallPrimes = 2 | 3 | 5 | 7 | 11;

export class A {
    public readonly hi: SmallPrimes = 2;
    public readonly hello: number = 1;
}

console.error(new A().hi);
console.error(new A().hello);

export const enum Foo {
    SECOND = 1000,
    VALUE_1 = 3,
    VALUE_2 = 4
}

export const enum HelloWorldAny {
    WORLD
}

console.error(Foo.SECOND);
console.error(Foo.VALUE_1);
console.error(Foo.VALUE_2);
console.error(HelloWorldAny.WORLD);

export const enum HelloWorld {
    World
}

console.error({
    a: `Hello 'world'`,
    b: HelloWorld.World
});

console.error(-1);
console.error(0);
console.error(1);

export abstract class AbstractTest {
    public static hello: string = 'Hello';
}

console.error(AbstractTest.hello);

console.warn(A1);
console.warn(new B1().hello('hello'));

/****
 * Test code
 * @typescript-eslint/no-useless-constructor
 */

class G {
    constructor(public value: string) {}
}

class D extends G {}

const d: D = new D('123');

// eslint-disable-next-line no-console
console.log(d.value);
