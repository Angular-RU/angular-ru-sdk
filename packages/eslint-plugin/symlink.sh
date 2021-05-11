#!/bin/bash

PACKAGE_NAME="eslint-plugin";

echo "[INFO]: starting create symlink..."
mkdir -p ../../node_modules/@angular-ru/
cd ../../node_modules/@angular-ru/ || echo 'not exist ./node_modules/@angular-ru'

if [ -d "../../packages/$PACKAGE_NAME/lib" ]
then
    echo "[INFO]: Directory ../../packages/$PACKAGE_NAME/lib exists."
    rm -rf "$PACKAGE_NAME"
    ln -s -f "../../packages/$PACKAGE_NAME" "$PACKAGE_NAME"
    echo '[INFO]: created symlink'
else
    echo "[ERROR]: Directory ../../packages/$PACKAGE_NAME/lib does not exists"
    echo "skip create symlink, please run 'yarn lerna run build:lib --scope=@angular-ru/$PACKAGE_NAME' before"
fi
