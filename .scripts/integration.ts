import { asyncExec } from './utils/async-exec';
import { errorHandler } from './utils/error-handler';
import { getPackages } from './utils/get-packages';
import { info } from './utils/info';

void (async function main(): Promise<void> {
    for (const packagePath of getPackages()) {
        info(`BUILD INTEGRATION APP: ${packagePath}`);
        await asyncExec(`cd ${packagePath} && yarn build:app`).catch(errorHandler);
    }
})();
