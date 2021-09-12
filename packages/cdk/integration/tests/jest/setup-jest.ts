import 'jest-preset-angular/setup-jest';

import { Any } from '@angular-ru/cdk/typings';

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
    (global.window as Any).innerWidth = width || global.window.innerWidth;
    (global.window as Any).innerHeight = width || global.window.innerHeight;
    (global.window as Any).dispatchEvent(resizeEvent);
};
