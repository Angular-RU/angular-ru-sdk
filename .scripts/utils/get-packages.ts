import path from 'path';

export function getPackages(): string[] {
    const { packages }: Record<string, unknown> = require(path.resolve('.', 'package.json'));
    return packages as string[];
}
