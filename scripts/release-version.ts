import { asyncExec } from './utils/async-exec';
import { log } from './utils/log';

void (async function main(): Promise<void> {
    log(`[RELEASE]`);
    await asyncExec(`yarn generate-changelog`);
    await asyncExec(`git add .`);
    await asyncExec(`git update-index --again`);
})();
