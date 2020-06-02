// expect errors
import { B1 } from './module/b1';
import { A1 } from './module/a1';
import { C1 } from './module/c1';

export class A {
    // expect errors
    public hi: number = 2;
    // expect errors
    hello = 1;
}

// expect errors
console.log(new A().hello);

// expect errors
console.log(new A().hi);

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
