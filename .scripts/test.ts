import { asyncExec } from './utils/async-exec';
import { errorHandler } from './utils/error-handler';
import { getPackages } from './utils/get-packages';
import { info } from './utils/info';
import { PackagesGraph } from './utils/packages-graph';

void (async function main(): Promise<void> {
    const graph: PackagesGraph = getPackages();
    const packages: string[] = [...graph.common, ...graph.dependent];
    const allScripts: Promise<unknown>[] = [];

    for (const packagePath of packages) {
        info(`TEST(parallel): ${packagePath}`);
        allScripts.push(asyncExec(`cd ${packagePath} && yarn test`).catch(errorHandler));
    }

    await Promise.all(allScripts);
})();
