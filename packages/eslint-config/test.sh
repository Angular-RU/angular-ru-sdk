#!/bin/bash

mkdir -p ./dist

{ # try
    npx eslint -c index.js "**/*.bad.ts" > ./dist/eslint.bad.report.txt
} || { # catch
    npx eslint -c index.js "**/*.good.ts" > ./dist/eslint.good.report.txt
    npx jest --config ./jest.config.js integration/tests/test.spec.ts
}
