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
        expect(bad.includes(`Don't declare non-const enums`)).toEqual(true);
        expect(bad.includes(`Enum name \`foo\` must match one of the following formats: StrictPascalCase`)).toEqual(
            true
        );
        expect(bad.includes(`Enum name \`HELLO\` must match one of the following formats: StrictPascalCase`)).toEqual(
            true
        );
        expect(bad.includes('Class name `TestClass` must have one of the following prefixes: Abstract')).toEqual(true);
        expect(bad.includes('Unexpected space before function parentheses')).toEqual(true);
        expect(
            bad.includes(`Don't use \`Function\` as a type. The \`Function\` type accepts any function-like value.`)
        ).toEqual(true);
        expect(bad.includes(`Class name \`little\` must match one of the following formats: PascalCase`)).toEqual(true);
        expect(bad.includes(`Class name \`Little_Bar\` must match one of the following formats: PascalCase`)).toEqual(
            true
        );
        expect(bad.includes(`Interface name \`myType\` must match one of the following formats: PascalCase`)).toEqual(
            true
        );
        expect(bad.includes(`Type Alias name \`alist\` must match one of the following formats: PascalCase`)).toEqual(
            true
        );
        expect(bad.includes('Useless constructor')).toEqual(true);
    });

    it('check success files', (): void => {
        const good: string = ensureDistFile('good');
        expect(good.length).toEqual(0);
    });
});
