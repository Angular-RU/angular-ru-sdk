const { projects } = require('./workspace.json');

module.exports = {
    extends: ['./libs/commitlint/index.js'],
    rules: {
        'scope-enum': () => [2, 'always', [...Object.keys(projects), 'release']]
    }
};
