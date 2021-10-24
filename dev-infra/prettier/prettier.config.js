module.exports = {
    $schema: 'https://json.schemastore.org/prettierrc',
    printWidth: 120,
    tabWidth: 4,
    useTabs: false,
    semi: true,
    singleQuote: true,
    trailingComma: 'none',
    htmlWhitespaceSensitivity: 'ignore',
    plugins: ['prettier-plugin-organize-attributes'],
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
    ]
};
