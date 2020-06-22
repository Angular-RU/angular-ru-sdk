#!/bin/bash

mkdir -p ./dist

yarn -s eslint -c index.js "**/*.bad.ts" > ./dist/eslint.bad.report.txt
yarn -s eslint -c index.js "**/*.good.ts" > ./dist/eslint.good.report.txt
yarn -s jest --config ./jest.config.js integration/tests/test.spec.ts
