import { Any } from '@angular-ru/common/typings';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

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

const dx: D = new D('123');

// eslint-disable-next-line no-console
console.log(dx.value);

class TestMaxParams {
    constructor(
        public a: number,
        public b: number,
        public c: number,
        public d: number,
        public e: number,
        public f: number
    ) {}
}

// eslint-disable-next-line @typescript-eslint/no-magic-numbers
const t: TestMaxParams = new TestMaxParams(1, 2, 3, 4, 5, 6);

// eslint-disable-next-line no-console
console.log(t.a);

@Component({
    selector: 'good-component',
    template: `<p>Good component works!</p>`
})
// eslint-disable-next-line @typescript-eslint/no-unused-vars
class GoodComponent implements OnInit {
    @Input('var-a') public a: Any;
    @Input() public _a: Any;
    @Input() public b: Any;
    @Output() public e!: EventEmitter<Any>;
    @Output('_e') public _e!: EventEmitter<Any>;

    public ngOnInit(): void {
        // noop
    }
}
