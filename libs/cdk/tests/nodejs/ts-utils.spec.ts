import {exposeTsCompilerOptionsByTsConfig} from '@angular-ru/cdk/node.js';

describe('[TEST]: TS Utils', () => {
    it('exposeTsCompilerOptionsByTsConfig', () => {
        expect(() => exposeTsCompilerOptionsByTsConfig('./tsconfig.any.json')).toThrow(
            /Not found tsconfig file by path/,
        );

        expect(
            exposeTsCompilerOptionsByTsConfig('../../tsconfig.lib.json', __dirname).paths,
        ).toEqual({
            '@angular-ru/cdk/*': ['./cdk/*/index.ts'],
        });
    });
});
