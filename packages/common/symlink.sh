#!/bin/bash

PACKAGE_NAME="common"

echo "[INFO]: creating symlink..."
mkdir -p ../../node_modules/@angular-ru/
cd ../../node_modules/@angular-ru/ || echo 'not exist ./node_modules/@angular-ru'

if [ -d "../../packages/$PACKAGE_NAME/dist/library" ]
then
    echo "[INFO]: Directory ../../packages/$PACKAGE_NAME/dist/library exists."
    rm -rf "$PACKAGE_NAME"
    ln -s -f "../../packages/$PACKAGE_NAME/dist/library" "$PACKAGE_NAME"
    echo '[INFO]: created symlink'
else
    echo "[ERROR]: Directory ../../packages/$PACKAGE_NAME/dist/library does not exists"
    echo "skip create symlink, please run 'yarn lerna run build:lib --scope=@angular-ru/$PACKAGE_NAME' before"
fi
