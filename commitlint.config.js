const { packages } = require('./package.json');

const scopes = packages.map((dir) => {
    const packageName = dir.split('/').pop();
    return `${packageName}`;
});

module.exports = {
    extends: ['./dev-infra/commitlint/index.js'],
    rules: {
        'scope-empty': [2, 'never'],
        'scope-enum': () => [2, 'always', [...scopes, 'release']]
    }
};
