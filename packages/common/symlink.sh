#!/bin/bash

echo "[INFO]: creating symlink..."

mkdir -p ../../node_modules/@angular-ru/
cd ../../node_modules/@angular-ru/ || echo 'not exist ./node_modules/@angular-ru'

if [ -d "../../packages/common/dist/library" ]
then
    echo "[INFO]: Directory ../../packages/common/dist/library exists."
    rm -rf common
    ln -s -f ../../packages/common/dist/library common
    echo '[INFO]: created symlink'
else
    echo "[ERROR]: Directory ../../packages/common/dist/library does not exists, skip create symlink, please run 'yarn lerna run build:lib --scope=@angular-ru/common' before"
fi
