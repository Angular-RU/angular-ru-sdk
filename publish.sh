#!/bin/bash

echo "Commit: $TRAVIS_COMMIT";
echo "Commit message: $TRAVIS_COMMIT_MESSAGE";

if [ -n "$NPM_TOKEN" ]; then
  npm config set '//registry.npmjs.org/:_authToken' "${NPM_TOKEN}"
fi

if [[ $TRAVIS_COMMIT_MESSAGE != *"publish"* ]]; then
  echo "Publish...."
  yarn lerna publish
fi;
