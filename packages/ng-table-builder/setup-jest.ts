import 'jest-preset-angular/setup-jest';

import { Any } from '@angular-ru/common/typings';

const jsdom: Any = require('jsdom');

const { JSDOM }: Any = jsdom;

const dom: Any = new JSDOM('<!DOCTYPE html><html><head></head><body></body></html>');

global['window'] = dom.window;
global['document'] = dom.window.document;

// Simulate window resize events
const resizeEvent: Any = document.createEvent('Event');
resizeEvent.initEvent('resize', true, true);

global['window'].resizeTo = (width: number): void => {
    (global['window'] as Any).innerWidth = width || global['window'].innerWidth;
    (global['window'] as Any).innerHeight = width || global['window'].innerHeight;
    (global['window'] as Any).dispatchEvent(resizeEvent);
};
