const { defaults: tsjPreset } = require('ts-jest/presets');
const path = require('path');

module.exports = {
    preset: 'ts-jest',
    rootDir: path.resolve(),
    transform: tsjPreset.transform
};
