import * as fs from 'node:fs';
import * as path from 'node:path';

describe('[TEST]: Angular-RU eslint recommendations for ts', (): void => {
    it('check failed files', (): void => {
        const bad: string = getInfoByReportFile('bad-file');

        // eslint-disable-next-line no-console
        console.log(bad);

        expect(bad.includes(`Expected hello to have a type annotation`)).toBeTruthy();
        expect(bad.includes('Missing accessibility modifier on class property hello')).toBeTruthy();
        expect(bad.includes('Unexpected console statement')).toBeTruthy();
        expect(
            bad.includes(
                'Please rename the variable `res`. Suggested names are: `response`, `result`. A more descriptive name will do too'
            )
        ).toBeTruthy();
        expect(bad.includes('No magic number: 2')).toBeTruthy();
        expect(bad.includes('No magic number: 5')).toBeTruthy();
        expect(bad.includes(`'uta' is defined but never used`)).toBeTruthy();
        expect(bad.includes('No magic number: 10')).toBeTruthy();
        expect(bad.includes(`Don't declare non-const enums`)).toBeTruthy();
        expect(
            bad.includes(`Enum name \`foo\` must match one of the following formats: StrictPascalCase`)
        ).toBeTruthy();
        expect(
            bad.includes(`Enum name \`HELLO\` must match one of the following formats: StrictPascalCase`)
        ).toBeTruthy();
        expect(bad.includes('Class name `TestClass` must have one of the following prefixes: Abstract')).toBeTruthy();
        expect(bad.includes('Unexpected space before function parentheses')).toBeTruthy();
        expect(
            bad.includes(`Don't use \`Function\` as a type. The \`Function\` type accepts any function-like value.`)
        ).toBeTruthy();
        expect(bad.includes(`Class name \`little\` must match one of the following formats: PascalCase`)).toBeTruthy();
        expect(
            bad.includes(`Class name \`Little_Bar\` must match one of the following formats: PascalCase`)
        ).toBeTruthy();
        expect(
            bad.includes(`Interface name \`myType\` must match one of the following formats: PascalCase`)
        ).toBeTruthy();
        expect(
            bad.includes(`Type Alias name \`alist\` must match one of the following formats: PascalCase`)
        ).toBeTruthy();
        expect(bad.includes('Useless constructor')).toBeTruthy();
        expect(bad.includes(`function 'f1' has too many parameters (4). Maximum allowed is 3`)).toBeTruthy();
        expect(bad.includes('arrow function has too many parameters (4). Maximum allowed is 3')).toBeTruthy();
        expect(bad.includes(`method 'f3' has too many parameters (4). Maximum allowed is 3`)).toBeTruthy();
        expect(bad.includes(`Expected a space after the ':'`)).toBeTruthy();
        expect(bad.includes(`Operator '=' must be spaced`)).toBeTruthy();
        expect(bad.includes(`Operator '+' must be spaced`)).toBeTruthy();
        expect(bad.includes(`'someNum' is assigned a value but never used`)).toBeTruthy();
        expect(bad.includes(`'someNum' is never reassigned. Use 'const' instead`)).toBeTruthy();
        expect(
            bad.includes('Angular will not invoke the `ngOnInit` lifecycle method within `@Injectable()` classes')
        ).toBeTruthy();
        expect(bad.includes('The selector of the component is mandatory')).toBeTruthy();
        expect(bad.includes('`template` has too many lines (7). Maximum allowed is 3')).toBeTruthy();
        expect(bad.includes('Use @HostBinding or @HostListener rather than the `host` metadata property')).toBeTruthy();
        expect(bad.includes('Use `@Input` rather than the `inputs` metadata property')).toBeTruthy();
        expect(bad.includes('Use `@Output` rather than the `outputs` metadata property')).toBeTruthy();
        expect(bad.includes(`Lifecycle interface 'OnInit' should be implemented for method 'ngOnInit'`)).toBeTruthy();
        expect(bad.includes('Pipes should implement `PipeTransform` interface')).toBeTruthy();
        expect(bad.includes(`'otherComplexFunction' is defined but never used`)).toBeTruthy();
        expect(
            bad.includes(`Remove this conditional structure or edit its code blocks so that they're not all the same`)
        ).toBeTruthy();
        expect(bad.includes('215:1    error  Missing return type on function')).toBeTruthy();
        expect(bad.includes('274:11   error  Missing return type on function')).toBeTruthy();
        expect(bad.includes('276:36   error  Missing return type on function')).toBeTruthy();
        expect(bad.includes('276:36   error  Missing return type on function')).toBeTruthy();
        expect(bad.includes('280:31   error  Missing return type on function')).toBeTruthy();
        expect(bad.includes(`Function 'someComplexFunction' has too many lines (32)`)).toBeTruthy();
        expect(bad.includes(`Function 'someComplexFunction' has a complexity of 9`)).toBeTruthy();
        expect(
            bad.includes(`Remove this conditional structure or edit its code blocks so that they're not all the same`)
        ).toBeTruthy();
        expect(bad.includes('Use the opposite operator (<=) instead')).toBeTruthy();
        expect(bad.includes(`285:5    error  Assignment to function parameter 'variable'`)).toBeTruthy();
        expect(
            bad.includes('Enum Member name `worldName` must match one of the following formats: PascalCase, UPPER_CASE')
        ).toBeTruthy();
        expect(bad.includes('Strings must use singlequote')).toBeTruthy();
        expect(bad.includes('Unexpected trailing comma')).toBeTruthy();
        expect(bad.includes('Expected non-Promise value in a boolean conditional')).toBeTruthy();
        expect(bad.includes('Component class names should end with one of these suffixes: "Component"')).toBeTruthy();
        expect(bad.includes('Directive class names should end with one of these suffixes: "Directive"')).toBeTruthy();
        expect(bad.includes('Lifecycle methods should not be empty')).toBeTruthy();
        expect(bad.includes('Declaring ngDoCheck and ngOnChanges method in a class is not recommended')).toBeTruthy();
        expect(bad.includes('Avoid using `forwardRef`')).toBeTruthy();
        // TODO: need investigate regression
        // expect(bad.includes('Output bindings, including aliases, should not be named as standard DOM events')).toBeTruthy();
        expect(bad.includes('Prefer named exports')).toBeTruthy();
        expect(bad.includes('["priv_prop"] is better written in dot notation')).toBeTruthy();
        expect(bad.includes('use `Boolean(foods)` instead')).toBeTruthy();
        // eslint-disable-next-line @typescript-eslint/quotes
        expect(bad.includes("use `foods.indexOf('.') !== -1` instead")).toBeTruthy();
        expect(
            bad.includes(`Function declared in a loop contains unsafe references to variable(s) 'fooX'`)
        ).toBeTruthy();
        expect(bad.includes('Unexpected function expression')).toBeTruthy();
        expect(bad.includes('Unexpected string concatenation')).toBeTruthy();
        expect(bad.includes('Expected blank line before this statement')).toBeTruthy();
        expect(
            // eslint-disable-next-line @typescript-eslint/quotes
            bad.includes("Unexpected use of 'setTimeout'. Avoid using timers. Use `timer` from rxjs instead")
        ).toBeTruthy();

        expect(bad.includes('You have a misspelled word: priv on String')).toBeTruthy();
        expect(bad.includes('You have a misspelled word: xb1 on Identifier')).toBeTruthy();
        expect(bad.includes('You have a misspelled word: xfd on Comment')).toBeTruthy();
        expect(bad.includes('You have a misspelled word: xfd on Template')).toBeTruthy();
    });

    it('check success files', (): void => {
        const good: string = getInfoByReportFile('good-file');

        expect(good).toHaveLength(0);
    });

    it('check file pattern in directories', () => {
        const filePattern: string = getInfoByReportFile('file-pattern');

        // eslint-disable-next-line no-console
        console.log(filePattern);

        expect(
            filePattern.includes(`Files doesn't must end with by .enum.ts  @angular-ru/enterprise/no-suffix-file`)
        ).toBeTruthy();
        expect(
            filePattern.includes(`Files doesn't must end with by .model.ts  @angular-ru/enterprise/no-suffix-file`)
        ).toBeTruthy();
        expect(
            filePattern.includes(`Files doesn't must end with by .interface.ts  @angular-ru/enterprise/no-suffix-file`)
        ).toBeTruthy();
        expect(
            filePattern.includes(`Files doesn't must end with by .interfaces.ts  @angular-ru/enterprise/no-suffix-file`)
        ).toBeTruthy();
    });
});

function getInfoByReportFile(type: 'bad-file' | 'good-file' | 'file-pattern'): string {
    return fs.readFileSync(path.resolve(__dirname, `../reports/eslint.${type}.report.txt`)).toString();
}
