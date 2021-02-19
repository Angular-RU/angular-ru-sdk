import { JestConfigOptions } from './jest-config.interface';

// eslint-disable-next-line max-lines-per-function
export function validateOptions(options: JestConfigOptions): void {
    if (!options.rootDir) {
        // eslint-disable-next-line no-console
        throw new Error(
            `rootDir should be initialized: you can specify it how\n module.exports = createJestConfig({ rootDir: path.resolve('.') }); \n`
        );
    }

    if (!options?.tsConfigRootPath) {
        throw new Error(
            `tsConfigRootPath should be initialized: \nmodule.exports = createJestConfig({ tsConfigRootPath: path.resolve('./tsconfig.json') });\n`
        );
    }
}
