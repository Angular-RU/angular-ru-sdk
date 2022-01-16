/* eslint-disable max-classes-per-file */
import 'jest-preset-angular/setup-jest';

import { Any } from '@angular-ru/cdk/typings';
import { arrayBuffer } from 'node:stream/consumers';
import { TransformStream } from 'node:stream/web';

declare const jest: Any;
declare const global: Any;

const jsdom: Any = require('jsdom');

const { JSDOM }: Any = jsdom;

const dom: Any = new JSDOM('<!DOCTYPE html><html><head></head><body></body></html>');

const observe: Any = jest.fn();
const unobserve: Any = jest.fn();

global.window = dom.window;
global.document = dom.window.document;

// you can also pass the mock implementation
// to jest.fn as an argument
global.window!.IntersectionObserver = jest.fn(
    (): Any => ({
        observe,
        unobserve
    })
);

// Simulate window resize events
const resizeEvent: Any = document.createEvent('Event');

resizeEvent.initEvent('resize', true, true);

global.window.resizeTo = (width: number): void => {
    global.window.innerWidth = width || global.window.innerWidth;
    global.window.innerHeight = width || global.window.innerHeight;
    global.window.dispatchEvent(resizeEvent);
};

global.TextEncoder = require('util').TextEncoder;
global.TextDecoder = require('util').TextDecoder;

global.CompressionStream = class {
    constructor() {
        return new TransformStream({
            transform(chunk: Uint8Array, controller: TransformStreamDefaultController): void {
                controller.enqueue(chunk);
            },
            flush(controller: TransformStreamDefaultController): void {
                controller.terminate();
            }
        });
    }
};

global.DecompressionStream = class {
    constructor() {
        return new TransformStream({
            transform(chunk: ArrayBuffer, controller: TransformStreamDefaultController): void {
                controller.enqueue(chunk);
            },
            flush(controller: TransformStreamDefaultController): void {
                controller.terminate();
            }
        });
    }
};

global.Response = class {
    constructor(public readonly readable: NodeJS.ReadableStream) {}

    public arrayBuffer(): Promise<ArrayBuffer> {
        return arrayBuffer(this.readable);
    }
};
