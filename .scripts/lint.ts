import { asyncExec } from './utils/async-exec';
import { info } from './utils/info';

void (async function main(): Promise<void> {
    info('LINT');
    await asyncExec(`yarn eslint . --fix --ignore-pattern '**/file-suites/**'`);
})();
