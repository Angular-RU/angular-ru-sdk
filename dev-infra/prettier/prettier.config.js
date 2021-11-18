module.exports = {
    $schema: 'https://json.schemastore.org/prettierrc',
    printWidth: 120,
    tabWidth: 4,
    useTabs: false,
    semi: true,
    singleQuote: true,
    trailingComma: 'none',
    htmlWhitespaceSensitivity: 'ignore',
    plugins: ['prettier-plugin-organize-attributes', '@prettier/plugin-xml'],
    bracketSameLine: false,
    bracketSpacing: true,
    arrowParens: 'always',
    proseWrap: 'always',
    endOfLine: 'auto',
    attributeGroups: [
        '$ANGULAR_STRUCTURAL_DIRECTIVE',
        '$ANGULAR_ELEMENT_REF',
        '$ID',
        '$DEFAULT',
        '$CLASS',
        '$ANGULAR_ANIMATION',
        '$ANGULAR_ANIMATION_INPUT',
        '$ANGULAR_INPUT',
        '$ANGULAR_TWO_WAY_BINDING',
        '$ANGULAR_OUTPUT'
    ],
    overrides: [
        {
            files: ['*.js', '*.ts'],
            options: { parser: 'typescript' }
        },
        {
            files: ['*.md'],
            options: { parser: 'markdown' }
        },
        {
            files: ['*.json', '.prettierrc', '.stylelintrc'],
            options: { parser: 'json' }
        },
        {
            files: ['*.less'],
            options: { parser: 'less' }
        },
        {
            files: ['*.scss'],
            options: { parser: 'scss' }
        },
        {
            files: ['*.html'],
            options: { parser: 'html' }
        },
        {
            files: ['*.template.html', '*.component.html'],
            options: { parser: 'angular' }
        },
        {
            files: ['*.svg'],
            options: { parser: 'xml' }
        },
        {
            files: ['*.xml'],
            options: { parser: 'xml' }
        }
    ]
};
