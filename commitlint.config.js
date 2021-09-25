const { packagesGraph } = require('./package.json');

const scopes = [...packagesGraph.common, ...packagesGraph.dependent].map((dir) => {
    const packageName = dir.split('/').pop();
    return `${packageName}`;
});

module.exports = {
    extends: ['./dev-infra/commitlint/index.js'],
    rules: {
        'scope-enum': () => [2, 'always', [...scopes, 'release']]
    }
};
