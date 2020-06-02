const fs = require('fs');

describe('[TEST]: Eslint', (): void => {
    function ensureDistFile(type: string): string {
        return fs.readFileSync(`./dist/eslint.${type}.report.txt`).toString();
    }

    it('check failed files', (): void => {
        const bad: string = ensureDistFile('bad');
        expect(bad.includes(`Run autofix to sort these imports!`)).toEqual(true);
        expect(bad.includes(`expected member-variable-declaration: 'hello' to have a typedef`)).toEqual(true);
        expect(bad.includes('Missing accessibility modifier on class property hello')).toEqual(true);
        expect(bad.includes('Unexpected console statement')).toEqual(true);
        expect(bad.includes('No magic number: 2')).toEqual(true);
        expect(bad.includes('No magic number: 5')).toEqual(true);
        expect(bad.includes('No magic number: 10')).toEqual(true);
        expect(bad.includes('Class name TestClass must have one of the following prefixes: Abstract')).toEqual(true);
    });

    it('check success files', (): void => {
        const good: string = ensureDistFile('good');
        expect(good.length).toEqual(0);
    });
});
