import { asyncExec } from './utils/async-exec';
import { info } from './utils/info';

void (async function main(): Promise<void> {
    info('LINT');
    await asyncExec(
        `yarn eslint --fix --cache --cache-location node_modules/.cache/.eslintcache '**/*.ts' '**/*.component.html' '**/*.json' --ignore-pattern '**/file-suites/**'`
    );
})();
