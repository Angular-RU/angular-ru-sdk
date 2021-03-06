/* eslint-disable max-classes-per-file */
import { ChangeDetectionStrategy, Component, EventEmitter, Injectable, Input, OnInit, Output } from '@angular/core';
import { Any } from '@angular-ru/common/typings';
import { BaseUrl, RequestBody, RestClient } from '@angular-ru/http/decorators';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { A1 } from './module/a1';
import { B1 } from './module/b1';
import { ExampleDeep } from './module/deep/deep/deep/deep/deep/deep/deeeeeeeeeeeeeeeeeeep/deeeeeeeeeeeeeeeeeeep/deeeeeeeeeeeeeeeeeeep/example-deep';

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

@BaseUrl()
@RestClient()
@Injectable()
class HttpClient {
    public invoke1(@RequestBody() _request: Any): void {
        // ...
    }

    public invoke2(@RequestBody() request: Any): void {
        console.error(request);
    }
}

// noinspection AngularMissingOrInvalidDeclarationInModule
@Component({
    selector: 'good-component',
    template: `<p>Good component works!</p>`,
    changeDetection: ChangeDetectionStrategy.OnPush
})
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
// eslint-disable-next-line @typescript-eslint/no-unused-vars,no-unused-vars
class GoodComponent implements OnInit {
    @Input('var-a') public a: Any;
    @Input() public _a: Any;
    @Input() public b: Any;
    @Output() public readonly e!: EventEmitter<Any>;
    @Output('_e') public readonly _e!: EventEmitter<Any>;

    constructor(private readonly api: HttpClient) {}

    public ngOnInit(): void {
        this.api.invoke1({});
        this.api.invoke2({});
    }
}

const foo = (): number => 0;
console.error(foo);

const arrowFn = () => (): Any => ({});
console.error(arrowFn);

const error = (message: string) => void console.error(message);
error('hello world');

switchMap((): Observable<ExampleDeep> => of(new ExampleDeep()));

document.addEventListener('click', (): void => {
    // hello
});

const fooZ: number[] = [].map((i: number): number => i * i);
console.error(fooZ);

(function a(variable: string): void {
    let newVar: string = variable;
    newVar = newVar + ' world';
    console.error(newVar);
})('hello');
