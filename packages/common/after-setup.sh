#!/bin/bash

# build symlink distributive builds for @angular-ru/common

mkdir -p ../../node_modules/@angular-ru/
cd ../../node_modules/@angular-ru/ || echo 'failed cd'
rm -rf common
ln -s -f ../../packages/common/dist/library common
