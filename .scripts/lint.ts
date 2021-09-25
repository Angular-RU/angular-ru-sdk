import { asyncExec } from './utils/async-exec';
import { info } from './utils/info';

const NOT_CI: boolean = process.env['CI_MODE'] !== 'true';

void (async function main(): Promise<void> {
    info('LINT');
    await asyncExec(
        `yarn eslint --fix ${
            NOT_CI ? '--cache --cache-location node_modules/.cache/.eslintcache' : ''
        } '**/*.ts' '**/*.component.html' '**/*.json' --ignore-pattern '**/file-suites/**'`
    );
})();
