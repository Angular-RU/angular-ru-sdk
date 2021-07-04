import { exposeTsCompilerOptionsByTsConfig } from '@angular-ru/common/node.js';

describe('[TEST]: TS Utils', () => {
    it('exposeTsCompilerOptionsByTsConfig', () => {
        expect(() => exposeTsCompilerOptionsByTsConfig('./tsconfig.any.json')).toThrow(
            /Not found tsconfig file by path/
        );

        expect(exposeTsCompilerOptionsByTsConfig('./tsconfig.lib.json').paths).toEqual({
            '@angular-ru/common/*': ['dist/library/common/dist/library/*']
        });
    });
});
