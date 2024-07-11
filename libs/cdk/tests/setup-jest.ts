/* eslint-disable max-classes-per-file,@typescript-eslint/no-explicit-any,import/first */
// import 'jest-preset-angular/setup-jest';
import 'zone.js/fesm2015/zone-testing-bundle.min.js';

import {arrayBuffer} from 'node:stream/consumers';
import {TransformStream} from 'node:stream/web';

import {getTestBed} from '@angular/core/testing';
import {
    BrowserDynamicTestingModule,
    platformBrowserDynamicTesting,
} from '@angular/platform-browser-dynamic/testing';

declare const jest: any;
declare const global: any;

const jsdom: any = require('jsdom');

const {JSDOM}: any = jsdom;

const dom: any = new JSDOM('<!DOCTYPE html><html><head></head><body></body></html>');

const observe: any = jest.fn();
const unobserve: any = jest.fn();

global.window = dom.window;
global.document = dom.window.document;

// you can also pass the mock implementation
// to jest.fn as an argument
global.window!.IntersectionObserver = jest.fn((): any => ({
    observe,
    unobserve,
}));

// Simulate window resize events
const resizeEvent: any = document.createEvent('Event');

resizeEvent.initEvent('resize', true, true);

global.window.resizeTo = (width: number): void => {
    global.window.innerWidth = width || global.window.innerWidth;
    global.window.innerHeight = width || global.window.innerHeight;
    global.window.dispatchEvent(resizeEvent);
};

global.TextEncoder = require('node:util').TextEncoder;
global.TextDecoder = require('node:util').TextDecoder;

global.CompressionStream = class {
    constructor() {
        return new TransformStream({
            transform(
                chunk: Uint8Array,
                controller: TransformStreamDefaultController,
            ): void {
                controller.enqueue(chunk);
            },
            flush(controller: TransformStreamDefaultController): void {
                controller.terminate();
            },
        });
    }
};

global.DecompressionStream = class {
    constructor() {
        return new TransformStream({
            transform(
                chunk: ArrayBuffer,
                controller: TransformStreamDefaultController,
            ): void {
                controller.enqueue(chunk);
            },
            flush(controller: TransformStreamDefaultController): void {
                controller.terminate();
            },
        });
    }
};

global.Response = class {
    constructor(public readonly readable: NodeJS.ReadableStream) {}

    public async arrayBuffer(): Promise<ArrayBuffer> {
        return arrayBuffer(this.readable);
    }
};

global.URL.createObjectURL = jest.fn((blob: Blob): string => `${blob}`);
global.URL.revokeObjectURL = jest.fn();

// todo get rid of execCommand
document.execCommand = jest.fn((): void => void 0);

getTestBed().initTestEnvironment(
    BrowserDynamicTestingModule,
    platformBrowserDynamicTesting(),
);
