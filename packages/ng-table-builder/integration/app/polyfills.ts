/* eslint-disable @typescript-eslint/no-explicit-any */
import 'hammerjs';
import 'intersection-observer';
import './zone-flags';
import 'zone.js/dist/zone';

(window as any)['__importDefault'] =
    (window as any)['__importDefault'] ||
    function (mod: any): any {
        return mod && mod.__esModule ? mod : { default: mod };
    };

(window as any).global = window; // Included with Angular CLI.
