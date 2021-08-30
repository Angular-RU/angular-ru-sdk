import { asyncExec } from './utils/async-exec';
import { errorHandler } from './utils/error-handler';
import { getPackages } from './utils/get-packages';
import { log } from './utils/log';

void (async function main(): Promise<void> {
    for (const packagePath of getPackages()) {
        log(`[BUILD]: ${packagePath}`);
        await asyncExec(`cd ${packagePath} && yarn build:lib`).catch(errorHandler);
    }
})();
