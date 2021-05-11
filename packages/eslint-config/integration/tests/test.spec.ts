const fs = require('fs');

describe('[TEST]: Angular-RU eslint recommendations', (): void => {
    function getInfoByReportFile(type: 'bad-file' | 'good-file' | 'file-pattern'): string {
        return fs.readFileSync(`./out/eslint.${type}.report.txt`).toString();
    }

    it('check failed files', (): void => {
        const bad: string = getInfoByReportFile('bad-file');
        expect(bad.includes('73 problems (73 errors, 0 warnings)')).toEqual(true);
        expect(bad.includes(`Run autofix to sort these imports!`)).toEqual(true);
        expect(bad.includes(`Expected hello to have a type annotation`)).toEqual(true);
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
        expect(bad.includes("function 'f1' has too many parameters (4). Maximum allowed is 3")).toEqual(true);
        expect(bad.includes('arrow function has too many parameters (4). Maximum allowed is 3')).toEqual(true);
        expect(bad.includes("method 'f3' has too many parameters (4). Maximum allowed is 3")).toEqual(true);
        expect(bad.includes("Expected a space after the ':'")).toEqual(true);
        expect(bad.includes("Operator '=' must be spaced")).toEqual(true);
        expect(bad.includes("Operator '+' must be spaced")).toEqual(true);
        expect(bad.includes("'someNum' is assigned a value but never used")).toEqual(true);
        expect(bad.includes("'someNum' is never reassigned. Use 'const' instead")).toEqual(true);
        expect(bad.includes('This lifecycle method is not called for Injectable')).toEqual(true);
        expect(bad.includes("The selector of the component 'AppComponent' is mandatory")).toEqual(true);
        expect(bad.includes('`template` has too many lines (7). Maximum allowed is 3')).toEqual(true);
        expect(bad.includes('Use @HostBinding or @HostListener rather than the `host` metadata property')).toEqual(
            true
        );
        expect(bad.includes('Use @Input rather than the `inputs` metadata property')).toEqual(true);
        expect(bad.includes('Use @Output rather than the `outputs` metadata property')).toEqual(true);
        expect(bad.includes("Lifecycle interface 'OnInit' should be implemented for method 'ngOnInit'")).toEqual(true);
        expect(bad.includes('Pipes should implement `PipeTransform` interface')).toEqual(true);
        expect(bad.includes('Unexpected any. Specify a different type')).toEqual(true);
        expect(bad.includes("'otherComplexFunction' is defined but never used")).toEqual(true);
        expect(
            bad.includes("Remove this conditional structure or edit its code blocks so that they're not all the same")
        ).toEqual(true);
        expect(bad.includes('215:1    error  Missing return type on function')).toEqual(true);
        expect(bad.includes('274:11   error  Missing return type on function')).toEqual(true);
        expect(bad.includes('276:36   error  Missing return type on function')).toEqual(true);
        expect(bad.includes('276:36   error  Missing return type on function')).toEqual(true);
        expect(bad.includes('280:31   error  Missing return type on function')).toEqual(true);
        expect(bad.includes("Function 'someComplexFunction' has too many lines (32)")).toEqual(true);
        expect(bad.includes("Function 'someComplexFunction' has a complexity of 9")).toEqual(true);
        expect(
            bad.includes("Remove this conditional structure or edit its code blocks so that they're not all the same")
        ).toEqual(true);
        expect(bad.includes('Use the opposite operator (<=) instead')).toEqual(true);
        expect(bad.includes("285:5    error  Assignment to function parameter 'variable'")).toEqual(true);
        expect(
            bad.includes('Enum Member name `worldName` must match one of the following formats: PascalCase, UPPER_CASE')
        ).toEqual(true);
        expect(bad.includes('Strings must use singlequote')).toEqual(true);
        expect(bad.includes('Unexpected trailing comma')).toEqual(true);
        expect(bad.includes('Expected non-Promise value in a boolean conditional')).toEqual(true);
        expect(bad.includes('The name of the class MyEtc should end with the suffix Component')).toEqual(true);
        expect(bad.includes('The name of the class FooEtc should end with suffix(es) "Directive"')).toEqual(true);
        expect(bad.includes('Lifecycle methods should not be empty')).toEqual(true);
        expect(bad.includes('Declaring ngDoCheck and ngOnChanges method in a class is not recommended')).toEqual(true);
        expect(bad.includes('Avoid using `forwardRef`')).toEqual(true);
        expect(bad.includes('The output property should not be named or renamed as a native event')).toEqual(true);
        expect(bad.includes('Prefer named exports')).toEqual(true);
    });

    it('check success files', (): void => {
        const good: string = getInfoByReportFile('good-file');
        expect(good.length).toEqual(0);
    });
});
