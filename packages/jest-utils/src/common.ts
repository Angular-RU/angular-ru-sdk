import { JestConfigOptions } from './jest-config.interface';

// eslint-disable-next-line max-lines-per-function
export function validateOptions(options: JestConfigOptions): void {
    if (!options?.tsConfigRootPath) {
        throw new Error(
            `tsConfigRootPath should be initialized: \nmodule.exports = createJestConfig({ tsConfigRootPath: path.resolve('./tsconfig.json') });\n`
        );
    }

    if (!Array.isArray(options?.testMatch)) {
        throw new Error(
            `testMatch should be initialized: \nmodule.exports = createJestConfig({ testMatch: [ "<rootDir>/tests/**/*.spec.ts" ] });\n`
        );
    }

    if (!options?.displayName) {
        throw new Error(
            'displayName should be initialized: \nmodule.exports = createJestConfig({ displayName: "MyApp" });\n'
        );
    }

    if (!options?.collectCoverageFrom) {
        throw new Error(
            'collectCoverageFrom should be initialized: \nmodule.exports = createJestConfig({ collectCoverageFrom: ["<rootDir>/src/app/**/*.ts"] });\n'
        );
    }
}
