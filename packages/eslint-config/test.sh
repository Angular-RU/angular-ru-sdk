#!/bin/bash

# preparing eslint reports
mkdir -p ./out
yarn -s eslint -c index.js "**/*.bad.ts" > ./out/eslint.bad-file.report.txt
yarn -s eslint -c index.js "**/*.good.ts" > ./out/eslint.good-file.report.txt
yarn -s eslint -c index.js "**/file-pattern/**/*.ts" > ./out/eslint.file-pattern.report.txt

# run test suites
yarn -s jest --config ./jest.config.js integration/tests/test.spec.ts
