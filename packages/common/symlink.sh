#!/bin/bash

# build symlink distributive builds for @angular-ru/common on parent node_modules

echo "creating symlink..."

mkdir -p ../../node_modules/@angular-ru/
cd ../../node_modules/@angular-ru/ || echo 'failed cd'
rm -rf common
ln -s -f ../../packages/common/dist/library common
