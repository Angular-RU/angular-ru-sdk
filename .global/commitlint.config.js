const {projects} = require('../workspace.json');

module.exports = {
    extends: [require('path').resolve(__dirname, '../libs/commitlint/index.js')],
    rules: {'scope-enum': () => [2, 'always', [...Object.keys(projects), 'release']]},
};
