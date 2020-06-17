import 'zone.js/dist/zone';

import { Any } from '../../src/interfaces/logger.internal';

(window as Any)['__importDefault'] =
    (window as Any)['__importDefault'] ||
    function (mod: Any): Any {
        return mod && mod.__esModule ? mod : { default: mod };
    };

(window as Any).global = window; // Included with Angular CLI.
