module.exports = {
    $schema: 'https://json.schemastore.org/prettierrc',
    printWidth: 120,
    tabWidth: 4,
    useTabs: false,
    semi: true,
    singleQuote: true,
    trailingComma: 'none',
    htmlWhitespaceSensitivity: 'ignore',
    plugins: [require.resolve('prettier-plugin-organize-attributes'), require.resolve('@prettier/plugin-xml')],
    bracketSameLine: false,
    bracketSpacing: true,
    arrowParens: 'always',
    proseWrap: 'always',
    endOfLine: 'auto',
    singleAttributePerLine: true,
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
            files: ['package.json'],
            options: { parser: 'json-stringify', plugins: [require.resolve('prettier-plugin-packagejson')] }
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
        },
        {
            files: ['*.yml', '*.yaml'],
            options: { parser: 'yaml', tabWidth: 2 }
        }
    ]
};
