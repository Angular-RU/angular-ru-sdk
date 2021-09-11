import { asyncExec } from './utils/async-exec';
import { info } from './utils/info';

void (async function main(): Promise<void> {
    info(`RELEASE`);
    await asyncExec(`yarn generate-changelog`);
    await asyncExec(`git add .`);
    await asyncExec(`git update-index --again`);
})();
