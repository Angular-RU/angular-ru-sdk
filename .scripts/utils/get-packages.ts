import path from 'path';
import { PackagesGraph } from './packages-graph';

export function getPackages(): PackagesGraph {
    const { packagesGraph }: Record<string, unknown> = require(path.resolve('.', 'package.json'));
    return packagesGraph as PackagesGraph;
}
