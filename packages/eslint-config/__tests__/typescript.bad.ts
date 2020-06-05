// expect errors
import { A1 } from './module/a1';
import { B1 } from './module/b1';
import { C1 } from './module/c1';

export class A {
    // expect errors
    public hi: number = 2;
    // expect errors
    hello = 1;
}

// eslint-disable-next-line no-console
console.log(new A().hello);
// eslint-disable-next-line no-console
console.log(new A().hi);

// expect errors
export enum foo {
    SECOND = 1000,
    VALUE_1 = 3,
    VALUE_2 = 4
}

// expect errors
export const enum HELLO {
    WORLD
}

console.error(foo.SECOND);
console.error(foo.VALUE_1);
console.error(foo.VALUE_2);
console.error(HELLO.WORLD);

// expect no errors
const helloWorld: Function = function (): string {
    return 'Hello world';
};

// expect no errors
helloWorld();

// expect no errors
const helloWorldAsync: Function = async function (): Promise<string> {
    return 'Hello world';
};

await helloWorldAsync();

// expect no errors
function helloWorldNamed(): string {
    return 'Hello world';
}

// expect no errors
helloWorldNamed();

// expect errors
console.error(5 * 10);

// expect errors
export abstract class TestClass {}

// expect errors
console.log(TestClass);

console.warn(new A1());
console.warn(new B1().hello(1));
console.warn(new B1().hello('hello'));
console.warn(new C1());

/****
 * Test code
 * @typescript-eslint/no-useless-constructor
 */
class G {
    constructor(public value: string) {}
}

class D extends G {
    // expect errors
    constructor(value: string) {
        super(value);
    }
}

const d: D = new D('123');

// eslint-disable-next-line no-console
console.log(d.value);
